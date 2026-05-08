export const normalizeArrayResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [
    payload.results,
    payload.data,
    payload.items,
    payload.projects,
    payload.proyectos,
  ];

  return candidates.find(Array.isArray) || [];
};

const DEFAULT_DATE_FIELDS = [
  'fecha_registro',
  'fecha_creacion',
  'created_at',
  'createdAt',
  'updated_at',
  'updatedAt',
];

const parseDateValue = (value) => {
  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (!value) {
    return 0;
  }

  const text = String(value).trim();
  if (!text || text === 'N/A') {
    return 0;
  }

  const yearFirstMatch = text.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (yearFirstMatch) {
    const [, year, month, day, hour = '0', minute = '0', second = '0'] = yearFirstMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second)).getTime();
  }

  const dayFirstMatch = text.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (dayFirstMatch) {
    const [, day, month, year, hour = '0', minute = '0', second = '0'] = dayFirstMatch;
    const normalizedYear = year.length === 2 ? `20${year}` : year;
    return new Date(
      Number(normalizedYear),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    ).getTime();
  }

  const parsedDate = Date.parse(text);
  return Number.isNaN(parsedDate) ? 0 : parsedDate;
};

const getNewestSortValue = (row, dateFields) => {
  const timestamp = dateFields.reduce((currentTimestamp, field) => {
    if (currentTimestamp > 0) {
      return currentTimestamp;
    }

    return parseDateValue(row?.[field]);
  }, 0);

  return timestamp || parseDateValue(row?.id) || 0;
};

export const sortByNewest = (rows, dateFields = DEFAULT_DATE_FIELDS) => (
  [...rows].sort((a, b) => getNewestSortValue(b, dateFields) - getNewestSortValue(a, dateFields))
);

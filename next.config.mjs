/** @type {import('next').NextConfig} */
const apiOrigin =
  process.env.API_ORIGIN ||
  process.env.NEXT_PUBLIC_API_ORIGIN ||
  "https://bancodeproyectos.hidalgo.gob.mx";

const apiRoutes = [
  ["api/:path*", "api/:path*"],
  ["api/b/:path*", "api/b/:path*"],
  ["proyecto", "proyecto/"],
  ["proyecto/:path*", "proyecto/:path*"],
  ["update-project/:path*", "update-project/:path*"],
  ["projects/:path*", "projects/:path*"],
  ["guardar-proyecto", "guardar-proyecto/"],
  ["guardar-proyecto/:path*", "guardar-proyecto/:path*"],
  ["ver-proyectos-usuario", "ver-proyectos-usuario/"],
  ["ver-proyectos-usuario/:path*", "ver-proyectos-usuario/:path*"],
  ["ver-proyectos-tabla", "ver-proyectos-tabla/"],
  ["ver-proyectos-tabla/:path*", "ver-proyectos-tabla/:path*"],
  ["ver-proyectos-tabla-admin", "ver-proyectos-tabla-admin/"],
  ["ver-proyectos-tabla-admin/:path*", "ver-proyectos-tabla-admin/:path*"],
  ["cedulas", "cedulas/"],
  ["cedulas/:path*", "cedulas/:path*"],
  ["inicio-sesion", "inicio-sesion/"],
  ["inicio-sesion/:path*", "inicio-sesion/:path*"],
];

const nextConfig = {
  async rewrites() {
    return apiRoutes.map(([source, destination]) => ({
      source: `/${source}`,
      destination: `${apiOrigin}/${destination}`,
    }));
  },
};

export default nextConfig;

const USERNAME = 'admin';
const PASSWORD = 'Pedil@nd123!';

export default function middleware(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Lasă libere fișierele statice necesare site-ului
  const publicPaths = [
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml',
  ];

  const publicPrefixes = [
    '/css/',
    '/js/',
    '/images/',
    '/icons/',
    '/vendor/',
    '/ajax/',
    '/script/',
  ];

  const isPublicFile =
    publicPaths.includes(pathname) ||
    publicPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (isPublicFile) {
    return;
  }

  const auth = request.headers.get('authorization');

  if (auth) {
    const encoded = auth.split(' ')[1];
    const decoded = atob(encoded);
    const [user, pass] = decoded.split(':');

    if (user === USERNAME && pass === PASSWORD) {
      return;
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Clinica Pediland"',
      'Cache-Control': 'no-store',
    },
  });
}
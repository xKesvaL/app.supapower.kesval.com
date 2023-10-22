import { BRAND, VERSION } from '$lib/config';

export async function GET() {
	const data = {
		name: BRAND.name,
		short_name: BRAND.name,
		start_url: `/?version=${VERSION}`,
		icons: [
			{
				src: '/android-chrome-192x192.png',
				sizes: '192x192',
				type: 'image/png'
			},
			{
				src: '/android-chrome-512x512.png',
				sizes: '512x512',
				type: 'image/png'
			}
		],
		theme_color: BRAND.color.primary,
		background_color: '#06040b',
		display: 'standalone'
	};

	return Response.json(data, {
		headers: {
			'Content-Type': 'application/manifest+json'
		}
	});
}

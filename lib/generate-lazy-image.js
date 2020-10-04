import got from 'got';
import sharp from 'sharp';
sharp.cache(false);
export default async function generateLazyImage(src) {
  console.log(`http://www.tristanme.com${src}`);
  const { body } = await got(`http://www.tristanme.com${src}`, { responseType: 'buffer' });
  const sharpImage = sharp(body);
  const { width, height, format } = await sharpImage.metadata();
  const lqipBuf = await sharpImage
    .resize({ width: 30, height: 30, fit: 'inside' })
    .toBuffer();
  return {
    src,
    aspectRatio: width / height,
    lqip: `data:image/${format};base64,${lqipBuf.toString('base64')}`,
  };
}
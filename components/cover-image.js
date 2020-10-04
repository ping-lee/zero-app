import cn from 'classnames'
import Link from 'next/link'
import LazyImage from '../components/lazy-image'
export default function CoverImage({ title, src, slug, lqip }) {
  const image = (
    <figure>
      <LazyImage
        className="demo"
        aspectRatio={16 / 9}
        lqip={lqip}
        src={src}
        alt="a woman covering face with frosted glass"
      />
      <figcaption>{}</figcaption>
    </figure>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

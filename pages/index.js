import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import generateLazyImage from '../lib/generate-lazy-image'

export default function Index({ allPostsA }) {
  const heroPost = allPostsA[0]
  const morePosts = allPostsA.slice(1)
  return (
    <>
      <Layout>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              lqip={heroPost.lqip}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])
  
  /*********************** */
  let allPostsA = []
  for (let index = 0; index < allPosts.length; index++) {
    const element = allPosts[index];
    let a = await generateLazyImage(element.coverImage);
    allPostsA.push(Object.assign(element, a));
  }
  //console.log(allPostsA)
/*********************** */
  return {
    props: { allPostsA },
  }
}

import { CMS_NAME } from '../lib/constants'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        博文
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
      泉香而酒冽，玉碗盛来琥珀光，直饮到梅梢月上，醉扶归，却为宜会亲友。
      </h4>
    </section>
  )
}

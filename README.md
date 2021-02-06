# Next.js Rendering Demo

https://next-rendering-test.vercel.app/rendering/ssr

- SSG
- SSR
- CSR
- ISR

I had no idea abount ISR at all...

## What ISR?

`getStaticProps`を使用して`revalidate`が使用されていれば ISR

SSG のように事前に全てのページを生成するのではなく、
一度アクセスされた際にレスポンス内容が生成され、次回行こうそちらの内容がレスポンスされる。

**SSG のデメリット**

- 静的なページを生成する際にページ数が多いとビルドに時間がかかる
- 一度しかビルドしないので再度全てのページをビルドしなおさないと内容が更新されない

**ISR が補うもの**

- アクセス時に初めて生成されるので初回ビルドが高速
- ISR でページ生成後も再度アクセスがあった際に次回以降の内容をビルドするので内容が更新される

## use ISR for pages file

- for NormalPage

```tsx
export const getStaticProps: GetStaticProps<{ date: string }> = async () => {
  return {
    props: {
      date: day().tz('Asia/Tokyo').format('YYYY/MM/DD HH:mm:ss'),
    },
    // revalidate: 前回から何秒いないのアクセスを無視するか
    revalidate: 1,
  }
```

- for DynamicRootesPage

```tsx
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import ErrorPage from '~/pages/_error'

import { fetchArticle } from '~/lib/api'
import { ArticleTemplate } from '~/components/templates'

// Article型のarticleをpropsに受け取る
const Post: NextPage<{ article: Article }> = ({ article }) => {
  const router = useRouter()

  if (!router.isFallback && !article?.id) return <ErrorPage statusCode={404} />

  return (
    <ArticleTemplate>
      <div dangerouslySetInnerHTML={{ __html: article.body }} />
    </ArticleTemplate>
  )
}

export default Post

// getStaticPathsで取得したリストをpropsに受け取る？
type StaticProps = { params: { slug: string } }
export const getStaticProps = async ({ params }: StaticProps) => {
  const article = await fetchArticle(params.slug)
  return {
    props: { article },
    // revalidate: 前回から何秒いないのアクセスを無視するか
    revalidate: 1,
  }
}

// リソースのidの一覧を取得
// fallback: アクセスされたURLのファイルが存在しない場合の挙動を決めるもの
// trueの場合はファイルがなくとも404エラーを返さない

export const getStaticPaths = async () => ({
  paths: [],
  fallback: true,
})
```

→ ブログ等のサイトでビルド後に新しい記事を生成し、そのページへの初回アクセスとなると
ISR を使っている場合少しだけ時間がかかる。
それ以降の同じページへのアクセスはすぐにレスポンスが返ってくるような動きになる。
サーバーサイドでレスポンスをする内容を生成するときに Functions が実行される。

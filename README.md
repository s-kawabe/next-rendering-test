# Next.js Rendering Demo

https://next-rendering-test.vercel.app/rendering/ssr

- SSG
- SSR
- CSR
- ISR

I had no idea abount ISR at all...

## What ISR?

`getStaticProps`を使用して`revalidate`が使用されていれば ISR

SSG のように事前に全てのページを生成するのではなく、<br>
一度アクセスされた際にレスポンス内容が生成され、次回行こうそちらの内容がレスポンスされる。<br>

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

### ISR Column

**ISR のビルド以降の新しいリソースへの初回アクセス**<br>
ブログ等のサイトでビルド後に新しい記事を生成し、そのページへの初回アクセスとなると<br>
ISR を使っている場合少しだけ時間がかかる。<br>
それ以降の同じページへのアクセスはすぐにレスポンスが返ってくるような動きになる。<br>
サーバーサイドでレスポンスをする内容を生成するときに Functions が実行される。<br><br>

**ISR はデータソース更新後も最初のユーザには過去のページが表示される**<br>
user ページなどで ISR を使ってしまうとユーザプロフィールを編集しても直後に<br>
変わっていないという現象になる可能性がある<br>
これを防ぐには ISR とクライアント fetch を使用したりするが、それでも<br>
シェア時に過去の OGP が表示されるなど問題がある。<br>
こういう状況の場合は SSR という選択肢もある。<br>

**ISR において rivalidate を短くしても編集後のページは<br>
初回ユーザには編集前の情報が表示される**

> ① 結果整合性(Eventual Consistency)のみが求められる場合
> →(incremental)静的生成で対応可能
>
> ② 強整合性(Strong Consistency)が求められる場合
>
> 1. getServerSideProps を使う or
> 2. swr 等でクライエント側で確実に更新する
>
> ユーザーによる編集は ②。

#### 結果整合性とは

結果整合性とは、エンティティに対して新たな更新がない限り、最終的にそのエンティティの<br>
すべての読み取りに、最後に更新された値が返されることを理論的に保証するもの<br>
インターネットのドメイン ネーム システム（DNS）は、結果整合性モデルを持つシステムのよく知られている例<br>
DNS サーバーには必ずしも最新の値が反映されず、値はインターネット上の多数のディレクトリでキャッシュされ、複製される。<br>

#### 強整合性

これに対して、従来のリレーショナル データベースは強整合性（即時整合性とも呼ばれます）の概念に基づいて設計されています。<br>
つまり、更新後にすぐに表示するデータは、そのエンティティのすべてのオブザーバーで一致します。<br>

**→ 強整合性のほうが負荷がかかる**

## (Supplement)SSG

SSG はビルド時にページを生成してしまう。<br>
クライアントからのアクセスがあった場合は既に生成済みのページを返すようにする<br>

**getStaticPaths**
動的なルートで静的生成をする際に使う<br>
動的なルートの例 (article/[id].tsx, users/[id]tsx)<br>
静的なルートの例 (/articles, /users)<br>

**getStaticPaths の return の fallback プロパティ**

- fallback: false<br>
  指定外のルードは 404 を返す
- falback: true 　<br>
  最初のリクエストにはフォールバックしローディング中に静的生成
- fallback: blocking<br>
  最初のリクエストは SSR の挙動。静的生成後に表示
- fallback: unstable_blocking<br>
  getStaticPaths と併用することで新しい動的ルーティングページに初めてリクエストがあった場合<br>
  それが動的にプリレンダリングされる。　<br>
  その結果はキャッシュに保存され、二度目以降のアクセスは動的 HTML が高速に返ってくる<br>

**データの追加がある時は、fallback:true,または blocking**<br>
true を利用する場合、初めてのユーザに見せるページを<br>
別に用意する必要があり、このような実装になる<br>

```tsx
const router = useRouter()

if (router.isFallback) {
  return <Loading />
}

return <ProductDetail product={product} />
```

# Storybook を導入する

**スタイルガイド作成ツールには大きく分けてふたつの種類がある。**

- JavaScript で記述するもの<br>
- Markdown で記述するもの。<br>
  JavaScript で記述していくタイプは作るのが多少面倒だが柔軟性があって、機能も豊富。<br>
  Markdown で記述するタイプは手軽に書けるが機能が絞られていて、動的な要素が少ない。<br>

---

## Storybook は TypeScript をサポートしている

Setting up TypeScript with babel-loader
を見ながらやれば OK

---

## Storybook インストール

### インストール

アプリのルートディレクトリで以下を実行する
babel-loader や storybook の addon が色々インストールされる。

```
npx sb init
```

この時点で既に`yarn storybook`が使用でき、実行すると
`http://localhost:6006/`に Storybook のページが立ち上がる

---

### ストーリーとは？

UI コンポーネントのレンダリングされた状態をキャプチャする。

```tsx
// Button.stories.tsx

import React from 'react'
import { Button } from './Button'

export const Primary: React.VFC<{}> = () => <Button primary>Button</Button>
```

---

### ストーリーを閲覧する

コンポーネントの props には型定義が必須？
以下の様に props の各引数にコメントを書くことで storybook の docs に
良い感じにコメントが表示される

```tsx
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}
```

**アドオン** <br>
**Controls**でコンポーネントの状態をインタラクティブに変更することができる。<br>
**Actions**でインタラクションがコールバックを介して正しい出力を生成することを確認するのに役立ちます。
たとえば、ヘッダーコンポーネントの「ログイン」ストーリーを表示する場合、
「ログアウト」ボタンをクリック onLogout すると、
ヘッダーを使用したコンポーネントによって提供されるコールバックがトリガーされることを確認できます。

---

### セットアップ

chakraUI を使う場合、恐らく preview.tsx で ChakraProvider を<br>
使い storybook のコンポーネントをラッピングしてあげる必要がある。

```tsx
import * as React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StoryContext } from '@storybook/react'

/**
 * Add global context for RTL-LTR switching
 */
export const globalTypes = {
  direction: {
    name: 'Direction',
    description: 'Direction for layout',
    defaultValue: 'LTR',
    toolbar: {
      icon: 'globe',
      items: ['LTR', 'RTL'],
    },
  },
}

const withChakra = (StoryFn: Function, context: StoryContext) => {
  const { direction } = context.globals
  const dir = direction.toLowerCase()
  return (
    <ChakraProvider theme={extendTheme({ direction: dir })}>
      <div dir={dir} id="story-wrapper" style={{ minHeight: '100vh' }}>
        <StoryFn />
      </div>
    </ChakraProvider>
  )
}

export const decorators = [withChakra]
```

---

### さいごに

Emotion を react と storybook で共存させるためには<br>
JSX プラグマを書いてはいけない。<br>
なので`@emotion/babel-preset-css-prop`をインストールする。<br>
babel と tsconfig.json の設定を書き換える<br>
https://qiita.com/282Haniwa/items/243f00c39ee7c992d7f7<br>
<br>

**上記をやると storybook の emotion スタイルはあたるが<br>
chakra のスタイルが外れてしまった。**<br>
→Emotion は styled を使ってコンポーネントに手を加えるようにする。

<br><br>
emotion で storybook にもグローバルスタイルを適用する方法<br>
https://uga-box.hatenablog.com/entry/2020/11/28/000000

---

import type { NextPage } from 'next'
import Head from 'next/head'
import Marquee from '../components/home/Marquee'
import { Hero } from '../components/beyond-stacks/Hero'
import { Overview } from '../components/beyond-stacks/Overview'
import { WhoItsFor } from '../components/beyond-stacks/WhoItsFor'
import { Pricing } from '../components/beyond-stacks/Pricing'
import { SessionFormats } from '../components/beyond-stacks/SessionFormats'
import { CommunityStrands } from '../components/beyond-stacks/CommunityStrands'
import { Faq } from '../components/beyond-stacks/Faq'

// Everything on this page is editorial copy, so it needs no data fetching —
// Next pre-renders it at build time. The footer carries the closing ticket
// call to action the design ends on.
const BeyondStacks: NextPage = () => (
  <>
    <Head>
      <title>Beyond Stacks Track — FlutterconKE</title>
      <meta
        name="description"
        content="A shared 3rd track across both conference days for the entire engineering ecosystem."
      />
    </Head>
    <div className="min-h-screen">
      <Marquee />
      <Hero />
      <Overview />
      <WhoItsFor />
      <Pricing />
      <SessionFormats />
      <CommunityStrands />
      <Faq />
    </div>
  </>
)

export default BeyondStacks

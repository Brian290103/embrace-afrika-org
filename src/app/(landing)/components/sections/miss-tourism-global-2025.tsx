"use client";

import HeaderTitle from "@/app/(landing)/components/header-title";
import SmallTitle from "@/app/(landing)/components/small-title";
import Image from "next/image";
import M_T_G_2025_Stories from "../m-t-g-2025-stories";
import {
  VideoPlayer,
  VideoPlayerContent,
  VideoPlayerControlBar,
  VideoPlayerMuteButton,
  VideoPlayerPlayButton,
  VideoPlayerSeekBackwardButton,
  VideoPlayerSeekForwardButton,
  VideoPlayerTimeDisplay,
  VideoPlayerTimeRange,
  VideoPlayerVolumeRange,
} from "@/components/kibo-ui/video-player";
import {
  Reel,
  ReelContent,
  ReelControls,
  ReelItem,
  ReelMuteButton,
  ReelNavigation,
  ReelNextButton,
  ReelPlayButton,
  ReelPreviousButton,
  ReelProgress,
  ReelVideo,
} from "@/components/kibo-ui/reel";

const reels: ReelItem[] = [
  {
    id: 3,
    type: "video",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1761717211/WhatsApp_Video_2025-10-29_at_08.12.37_bzr2j0.mp4",
    duration: 6,
    title: "Mitchelle Otieno",
    description: "Mitchelle Otieno",
  },
  {
    id: 1,
    type: "video",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712150/Welcome_Back_Queen_mishahspage_We_re_beyond_proud_to_welcome_home_Mitchelle_Otieno_our_very_own_Miss_Tourism_Global_2025_beautypointcollege_was_honored_to_be_part_of_the_warm_reception_celebrating_her_historic_wi_odtbzo.mp4",
    duration: 6,
    title: "Mitchelle Otieno",
    description:
      "Mitchelle Otieno is a Kenyan model and actress who has been crowned Miss Tourism Global 2025/2026 at the 28th edition of the Miss Tourism Global pageant.",
  },
  {
    id: 2,
    type: "image",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712876/kenya_welcomes_their_queen_g7ynlg.mp4",
    duration: 6,
    title: "Mitchelle Otieno",
    description: "Mitchelle Otieno",
  },
];
const MissTourismGlobal2025 = () => {
  return (
    <div className="mx-auto w-full flex flex-col gap-5">
      <HeaderTitle
        title="Miss Tourism Global 2025"
        url="/models/mitchelle-otieno"
        subtitle="Queen Michelle Otieno, a beacon of beauty and grace "
      />
      <M_T_G_2025_Stories />
      <section className="mx-auto grid w-full max-w-5xl pb-10 grid-cols-1 gap-10 p-2 md:grid-cols-2 lg:grid-cols-3">
        <article className="flex flex-col gap-3 lg:col-span-2">
          <p className="text-sm md:text-base">
            Mitchelle Otieno, representing Kenya 🇰🇪, achieved a historic victory
            by being crowned Miss Tourism Global 2025/2026 at the 28th edition
            of the Miss Tourism International (MTI) pageant in Malaysia. Her
            triumph significantly elevates Kenya&apos;s global image, showcasing
            the nation&apos;s vibrant spirit and potential.
          </p>

          <SmallTitle title="A Queen's Journey 🏆" />
          <p className="text-sm md:text-base">
            Mitchelle&apos;s performance was lauded for her confidence,
            elegance, and profound cultural pride, highlighted by her stunning
            national costume featuring intricate Maasai beadwork and Kenyan
            wildlife motifs.
          </p>

          <SmallTitle title="Tourism Ambassadorship ✈️" />
          <p className="text-sm md:text-base">
            As Miss Tourism Global 2025/2026 and Miss Tourism International
            Kenya 2025, Mitchelle is dedicated to promoting Kenya&apos;s tourism
            sector worldwide. Officially endorsed by the Cabinet Secretary for
            Tourism and Wildlife and the Kenya Tourism Board (@magicalkenya),
            her core mission is to collaborate with "Magical Kenya" to showcase
            the country&apos;s diverse offerings and advocate for sustainable
            tourism. She inspires every Kenyan to be an ambassador for their
            country.
          </p>

          <SmallTitle title="Professional & Inspirational Profile 🌟" />
          <p className="text-sm md:text-base">
            Beyond her title, Mitchelle is a successful commercial model,
            catwalk coach, and trainer, known for her grace and vibrant stage
            presence. Her homecoming to Nairobi was met with a lavish cultural
            reception at JKIA, celebrating her journey "from grooming to glory"
            and serving as a powerful message of empowerment for Kenyan youth.
          </p>
        </article>
        <article>
          <Reel data={reels}>
            <ReelProgress />
            <ReelContent>
              {(reel) => (
                <ReelItem key={reel.id}>
                  <ReelVideo src={reel.src} />
                </ReelItem>
              )}
            </ReelContent>
            <ReelNavigation />
            <ReelControls>
              <ReelPreviousButton />
              <div className="flex gap-2">
                <ReelPlayButton />
                <ReelMuteButton />
              </div>
              <ReelNextButton />
            </ReelControls>
          </Reel>

          {/*<Image
            src="https://res.cloudinary.com/doouqrlsg/image/upload/v1761668038/570825571_18064232675387411_9094747898303993362_n._1_y4modt.jpg"
            alt="Queen Mitchelle Otieno -  Miss Tourism Global 2025"
            className="w-full rounded-xl object-cover"
            width={1000}
            height={800}
          />*/}
        </article>
      </section>

      <div className="w-full max-w-7xl pb-10 mx-auto flex   items-center justify-center">
        <VideoPlayer className="overflow-hidden rounded-lg border">
          <VideoPlayerContent
            className="w-full min-h-[500px]"
            crossOrigin=""
            muted
            preload="auto"
            slot="media"
            autoPlay
            src="https://res.cloudinary.com/doouqrlsg/video/upload/v1761717585/WhatsApp_Video_2025-10-29_at_08.49.12_sgbmdg.mp4"
          />
          <VideoPlayerControlBar>
            <VideoPlayerPlayButton />
            <VideoPlayerSeekBackwardButton />
            <VideoPlayerSeekForwardButton />
            <VideoPlayerTimeRange />
            <VideoPlayerTimeDisplay showDuration />
            <VideoPlayerMuteButton />
            <VideoPlayerVolumeRange />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </div>
    </div>
  );
};

export default MissTourismGlobal2025;

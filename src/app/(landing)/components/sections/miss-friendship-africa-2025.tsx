"use client";

import HeaderTitle from "@/app/(landing)/components/header-title";
import SmallTitle from "@/app/(landing)/components/small-title";
import Image from "next/image";
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
import M_F_A_2025_Stories from "../m-f-a-2025-stories";

const reels: ReelItem[] = [
  {
    id: 3,
    type: "video",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1762504914/WhatsApp_Video_2025-11-06_at_20.30.44_yyq2m8.mp4",
    duration: 12,
    title: "Kaddy Samateh",
    description: "Kaddy Samateh",
  },
  {
    id: 1,
    type: "video",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492473/Facebook_2_n3cdyn.mp4",
    duration: 12,
    title: "Kaddy Samateh",
    description:
      "Kaddy Samateh is a Kenyan model and actress who has been crowned Miss Tourism Global 2025/2026 at the 28th edition of the Miss Tourism Global pageant.",
  },
  {
    id: 2,
    type: "video",
    src: "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492438/Facebook_3_k6oegt.mp4",
    duration: 6,
    title: "Kaddy Samateh",
    description: "Kaddy Samateh",
  },
];

const MissFriendshipAfrica2025 = () => {
  return (
    <div className="mx-auto w-full flex flex-col gap-5">
      <HeaderTitle
        title=" 1st Runner Up of Miss Friendship International Africa"
        url="/models/kaddy-samateh"
        subtitle="Kaddy Samateh: The Gambia's esteemed representative and a symbol of African excellence"
      />
      <M_F_A_2025_Stories />
      <section className="mx-auto px-2 grid w-full max-w-5xl pb-10 grid-cols-1 gap-10 p-2 md:grid-cols-2 lg:grid-cols-3">
        <article className="flex flex-col gap-3 lg:col-span-2">
          <p className="text-sm md:text-base">
            <strong>Kaddy Samateh</strong>,
            <strong>Miss Friendship Gambia</strong>, was proudly crowned the
            <strong>
              1st Runner Up of Miss Friendship International Africa
            </strong>
            at the <strong>Miss Friendship International 2025</strong>
            competition in Guiyang, China, among approximately 60 participating
            countries.
          </p>

          <SmallTitle title="A Journey of Resilience and Victory" />
          <p className="text-sm md:text-base">
            Kaddy&apos;s journey was marked by trials, including a two-week late
            arrival and a five-day luggage delay. Overcoming these significant
            challenges to achieve such a prestigious title was a
            &quot;miracle&quot; for her, highlighting her resilience and
            dedication.
          </p>

          <SmallTitle title="A Powerful Platform for African Friendship and Diversity" />
          <p className="text-sm md:text-base">
            This victory is a testament to the vibrant spirit of
            <strong>The Gambia</strong> and the African continent, serving as a
            powerful platform for
            <strong>African friendship and diversity</strong> globally. Kaddy
            expressed immense gratitude to <strong>Almighty Allah</strong> for
            this opportunity and success.
          </p>

          <SmallTitle title="A Legacy of Global Achievements" />
          <p className="text-sm md:text-base">
            This latest achievement adds to Kaddy&apos;s impressive
            international track record. Her past successes include being crowned
            <strong>Miss Personality</strong> at <strong>Miss Glamwall</strong>
            in India (Top 12-15), winning <strong>Miss World Diversity</strong>
            in Dubai, and securing 1st Runner Up at
            <strong>Universal Woman</strong>. Kaddy consistently raises
            <strong>The Gambia&apos;s</strong> flag higher on every global
            platform she represents.
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
            alt="Queen Kaddy Samateh -  Miss Tourism Global 2025"
            className="w-full rounded-xl object-cover"
            width={1000}
            height={800}
          />*/}
        </article>
      </section>

      <div className="w-full px-2 max-w-7xl pb-10 mx-auto">
        <Image
          src="https://res.cloudinary.com/doouqrlsg/image/upload/v1762504248/WhatsApp_Image_2025-11-06_at_20.30.47_1_nz5moc.jpg"
          alt="Kaddy Samateh receiving crown"
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default MissFriendshipAfrica2025;

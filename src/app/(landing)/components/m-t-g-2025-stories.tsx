"use client";

import {
  Stories,
  StoriesContent,
  Story,
  StoryAuthor,
  StoryAuthorImage,
  StoryAuthorName,
  StoryOverlay,
  StoryVideo,
} from "@/components/kibo-ui/stories";

const stories = [
  {
    id: 1,
    author: "ANU",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710602/11266365_792607277520703_1660545209_a._fzfsaa.jpg",
    fallback: "ANU",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761673301/AQNwGHSUUjWaUym5sx2TLZHTB3uDI_bAMTnB961Vm4s7AZ5zaY7Q7Y1dNeyaSUmwrjkRHwjDWPHp_ASm3AkURe1Y51ImnPan_kckejm.mp4",
  },
  {
    id: 2,
    author: "City Cast TV",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710632/452314960_1007160877715150_4047329761750471245_n._fwrawu.jpg",
    fallback: "CCTV",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761711330/AQOcqzBVcRrp2wo-ren1OGLiVj4NbRux1TEC2PpR-hqkgy1pndIgIf-Tl1D2Lxe3eHcXRKWkWNmbTxJ9x8PvwDx5eEIcwoUP_mplzxy.mp4",
  },
  {
    id: 3,
    author: "Miss Tourism International Kenya",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710598/535299467_17858156127476794_4476769943350043009_n._mntevp.jpg",
    fallback: "MTIK",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712876/kenya_welcomes_their_queen_g7ynlg.mp4",
  },
  {
    id: 3,
    author: "Miss Tourism International Kenya",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710598/535299467_17858156127476794_4476769943350043009_n._mntevp.jpg",
    fallback: "MTIK",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761717219/WhatsApp_Video_2025-10-29_at_08.12.45_ljrmvr.mp4",
  },
  {
    id: 4,
    author: "Beauty Point College",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761712157/529653922_18414336058129832_7548261993390807573_n._j7ciel.jpg",
    fallback: "BPC",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712150/Welcome_Back_Queen_mishahspage_We_re_beyond_proud_to_welcome_home_Mitchelle_Otieno_our_very_own_Miss_Tourism_Global_2025_beautypointcollege_was_honored_to_be_part_of_the_warm_reception_celebrating_her_historic_wi_odtbzo.mp4",
  },
  {
    id: 5,
    author: "Mitchelle Otieno",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761667975/573117022_18064232705387411_6596554189810956086_n._1_n5fkjc.jpg",
    fallback: "MO",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712146/Special_appreciation_to_Snr._Dennis_Itumbi_dennisitumbi_for_his_steadfast_support_towards_Kenya_s_creative_economy_and_youth_empowerment._Your_commitment_continues_to_inspire_and_uplift_young_talents_across_the_nation_Miss_Tou_mltbym.mp4",
  },
  {
    id: 5,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1761712474/The_African_energy_misstourisminternational_.._misstourisminternational_o1l7t8.mp4",
  },
];

const M_T_G_2025_Stories = () => (
  <Stories opts={{ loop: true }}>
    <StoriesContent>
      {stories.map((story) => (
        <Story
          className="aspect-[7/12]   md:aspect-[3/4] basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5   "
          key={Math.random().toString()}
        >
          <StoryVideo autoPlay={true} src={story.video} />
          <StoryOverlay />
          <StoryAuthor>
            <StoryAuthorImage
              fallback={story.fallback}
              name={story.author}
              src={story.avatar}
            />
            <StoryAuthorName>{story.author}</StoryAuthorName>
          </StoryAuthor>
        </Story>
      ))}
    </StoriesContent>
  </Stories>
);

export default M_T_G_2025_Stories;

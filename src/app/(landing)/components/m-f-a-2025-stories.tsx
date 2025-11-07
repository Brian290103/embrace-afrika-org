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
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492423/Facebook_4_ur6dci.mp4",
  },
  {
    id: 2,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492422/Facebook_7_uh1gnd.mp4",
  },
  {
    id: 3,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492426/Special_Thank_You_to_My_National_Director_Embrace_Africa_Words_can_t_express_how_grateful_I_am_to_my_National_Director_and_the_entire_Embrace_Africa_team_for_giving_me_the_opportunity_to_represent_The_Gambia_at_Miss_Friendshi_dkb35r.mp4",
  },
  {
    id: 4,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492429/Facebook_5_uk2o86.mp4",
  },
  {
    id: 5,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492438/Facebook_3_k6oegt.mp4",
  },
  {
    id: 6,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492439/Facebook_8_cmvlb1.mp4",
  },
  {
    id: 7,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492468/Touched_down_in_China_for_the_Miss_Friendship_International_2025_global_finals._Model_-_Miss_Friendship_International_Gambia_Host_Country_-_China_International_Director_-_Embrace_Afrika_www.embraceafrika.org._mfi_od3gdm.mp4",
  },
  {
    id: 8,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492479/Facebook_6_fiygrh.mp4",
  },
  {
    id: 9,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492473/Facebook_2_n3cdyn.mp4",
  },
  {
    id: 10,
    author: "Embrace Africa",
    avatar:
      "https://res.cloudinary.com/doouqrlsg/image/upload/v1761710615/60.1761708863974.D7vLPchRV2dCT9nN-3E-ET-VFn-ch0igboIRjPkKebM.Vy8iMTNjOGEtMTk1M2UxNmQzOTEi_opldg7.webp",
    fallback: "EA",
    video:
      "https://res.cloudinary.com/doouqrlsg/video/upload/v1762492480/The_smile_says_it_all._Our_queen_from_the_smiling_Coast_of_Africa_-_Miss_Friendship_International_Gambia._International_Director_-_EmbraceAfrika_Host_Country_-_China_oen2lq.mp4",
  },
];

const M_F_A_2025_Stories = () => (
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

export default M_F_A_2025_Stories;

export type Review = {
  reactions: reactions;
  problem: string;
  rate: number;
  image: string;
  location: string;
  content: string;
  time: string;
  author: string;
};
export type LocationImg = {
 title: string;
 img:Img;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};

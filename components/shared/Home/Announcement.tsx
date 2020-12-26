import { useRouter } from "next/router";

import Emoji from "components/shared/Emoji";

import styles from "./Home.module.css";

const Announcement: React.FC = () => {
  const { locale } = useRouter();

  if (locale === "en-US") {
    return (
      <div className={styles.announcement}>
        Merry Christmas! <Emoji symbol="🎉" label="Party Pooper" />{" "}
        <Emoji symbol="🎉" label="Party Pooper" /> <br />
        <br />
        You can play dos and arcade games at Game Noir. We make sure everything
        just works, but if you do find a problem, just send us an email (
        <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>
        ).
      </div>
    );
  }

  return (
    <div className={styles.announcement}>
      圣诞快乐! <Emoji symbol="🎉" label="Party Pooper" />{" "}
      <Emoji symbol="🎉" label="Party Pooper" />
      <br />
      <br />
      老游戏我们玩的是情怀，是再次看到童年的恍若隔世。当年那些经典的作品其实用现在的眼光去仔细欣赏也绝不比现在最好的作品逊色。虽然当年在技术上他们不能实现高画质的动画效果，也没料想到后来衍生出的多姿多彩的游戏类型，但是我们推荐的这些经典游戏每个都经过时间考验，每个都是当年最优秀的游戏制作组倾尽心血制成的大作，他们用心打造每个细节，就是为了给玩家带了一个可以沉浸其中流连忘返的游戏体验。
      <br />
      <br />
      每款游戏都经过我们测试。友情提示：在电脑上玩游戏的效果要比手机上更好。
      最新添加：
      大航海时代2，鬼马小英雄，英雄传说1/2/3，天使帝国1/2，乌龙院，特勤机甲队1/2，波斯王子1/2，富甲天下1/2
      <br />
      <br />
      如果你在游戏过程中遇到什么疑难困惑，或者你有一款非常想玩的老游戏，你可以直接给我们发邮件(
      <a href="mailto:cliffgoslinginc@gmail.com">cliffgoslinginc@gmail.com</a>)
    </div>
  );
};

export default Announcement;

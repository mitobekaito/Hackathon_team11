import React, { useState, useEffect } from "react";
import "./LevelDisplay.css";

const LevelDisplay = ({ initialXp = 0, subjectName }) => {
    const [xp, setXp] = useState(initialXp);
    const [isDead, setIsDead] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setXp((prevXp) => {
                if (prevXp > 0) {
                    return prevXp - 1; // 24時間ごとにXPを1減少
                } else {
                    setIsDead(true); // XPが0未満になったら死亡
                    return 0;
                }
            });
        }, 24 * 60 * 60 * 1000); // 24時間ごとに実行

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setXp(initialXp);
    }, [initialXp]);

    const level = Math.max(0, Math.floor(xp / 100) + 1); // XPが未定義の時も0として扱う
    const nextLevelXp = isDead ? 0 : level * 100;// 次のレベルに必要なXP
    const progressPercentage = xp ? ((xp % 100) / 100) * 100 : 0; // NaN回避

    // たまごっちの表情を変更
    const getTamagotchiImage = () => {
        if (isDead) return "☠️"; // 死亡状態
        if (level < 5) return "🐣";  // レベル低
        if (level < 10) return "😊"; // レベル中
        return "😎";               // レベル高
    };

    console.log(`Rendering LevelDisplay for ${subjectName} with XP: ${xp}, Level: ${level}, Image: ${getTamagotchiImage()}`);

    return (
        <div className="level-display-card bg-base-200 shadow-lg p-4 rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold">{subjectName}</h3>
            <div className="text-6xl">{getTamagotchiImage()}</div>
            <div className="level-display-progress w-full bg-gray-300 rounded-full h-4 mt-2">
                <div
                    className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="text-sm text-gray-400">XP: {xp} / {nextLevelXp}</p>
        </div>
    );    
};

export default LevelDisplay;
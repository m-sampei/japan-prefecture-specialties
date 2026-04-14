import { useState } from 'react';
import './App.css';

/** 都道府県名 */
type PrefectureName = '北海道' | '東京都' | '静岡県' | '大阪府' | '福岡県';

/** 都道府県ごとの表示データ */
type PrefectureData = {
  name: PrefectureName;
  specialties: string[];
};

/** 名産品マスタ */
const PREFECTURE_DATA: PrefectureData[] = [
  { name: '北海道', specialties: ['じゃがいも', 'ジンギスカン', '白い恋人'] },
  { name: '東京都', specialties: ['人形焼', '雷おこし', '深川めし'] },
  { name: '静岡県', specialties: ['お茶', 'うなぎ', 'わさび'] },
  { name: '大阪府', specialties: ['たこ焼き', 'お好み焼き', '豚まん'] },
  { name: '福岡県', specialties: ['明太子', 'とんこつラーメン', 'あまおう'] },
];

/** 都道府県選択で名産品を表示する */
function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<PrefectureName | null>(null);

  const selectedData = PREFECTURE_DATA.find(
    (prefecture) => prefecture.name === selectedPrefecture
  );

  return (
    <div className="app">
      <h1 className="appTitle">都道府県の名産品</h1>

      <div className="buttonList">
        {PREFECTURE_DATA.map((prefecture) => {
          const isActive = selectedPrefecture === prefecture.name;

          return (
            <button
              key={prefecture.name}
              type="button"
              className={isActive ? 'prefectureButton active' : 'prefectureButton'}
              onClick={() => setSelectedPrefecture(prefecture.name)}
            >
              {prefecture.name}
            </button>
          );
        })}
      </div>

      {selectedData ? (
        <section className="result">
          <h2>{selectedData.name}の名産品</h2>
          <ul>
            {selectedData.specialties.map((specialty) => (
              <li key={specialty}>{specialty}</li>
            ))}
          </ul>
        </section>
      ) : (
        <p className="emptyMessage">都道府県を選択してください</p>
      )}
    </div>
  );
}

export default App;

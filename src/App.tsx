import { useEffect, useMemo, useRef, useState } from 'react';
import mapSvgRaw from './assets/map-full.svg?raw';
import prefecturesByCode from './data/prefectures.json';

/** 都道府県選択状態 */
type SelectedPrefecture = {
  code: string;
  name: string;
};

/** 名産品表示データ */
type SpecialtyData = {
  name: string;
  specialties: readonly string[];
};

/** 都道府県コードごとの名産品データ */
const SPECIALTIES_BY_CODE: Record<string, SpecialtyData> = prefecturesByCode;

/** data-code がない場合に使う class 名と都道府県コードの対応 */
const CLASS_TO_CODE: Record<string, string> = {
  hokkaido: '01',
  tokyo: '13',
  shizuoka: '22',
  osaka: '27',
  fukuoka: '40',
};

/** class セレクター文字列 */
const CLASS_SELECTOR = Object.keys(CLASS_TO_CODE)
  .map((className) => `.${className}`)
  .join(',');

/** 都道府県コードを 2 桁に正規化 */
function normalizeCode(rawCode: string | null): string | null {
  if (!rawCode) {
    return null;
  }

  return rawCode.padStart(2, '0');
}

/** class 名から都道府県コードを推定 */
function getCodeFromClass(element: Element): string | null {
  for (const className of Array.from(element.classList)) {
    const code = CLASS_TO_CODE[className];
    if (code) {
      return code;
    }
  }

  return null;
}

/** クリック対象要素から都道府県情報を抽出 */
function buildSelectedPrefecture(element: Element): SelectedPrefecture | null {
  const code = normalizeCode(element.getAttribute('data-code')) ?? getCodeFromClass(element);
  if (!code) {
    return null;
  }

  const nameFromSvg = element.getAttribute('data-name');
  const nameFromMaster = SPECIALTIES_BY_CODE[code]?.name;
  const name = nameFromMaster ?? nameFromSvg ?? `都道府県コード ${code}`;

  return { code, name };
}

/** 地図表示コンポーネントの Props */
type JapanMapProps = {
  selectedCode: string | null;
  onSelect: (prefecture: SelectedPrefecture) => void;
};

/** 日本地図 SVG を表示し都道府県クリックを通知 */
function JapanMap({ selectedCode, onSelect }: JapanMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) {
      return;
    }

    const mapElement: HTMLDivElement = mapContainer;

    /** 選択状態とクリック可能スタイルを反映 */
    function applyMapClasses() {
      const codeElements = mapElement.querySelectorAll<SVGElement>('[data-code]');
      for (const element of codeElements) {
        const code = normalizeCode(element.getAttribute('data-code'));
        element.classList.add('is-clickable');
        element.classList.toggle('is-selected', code === selectedCode);
      }

      if (!CLASS_SELECTOR) {
        return;
      }

      const classElements = mapElement.querySelectorAll<SVGElement>(CLASS_SELECTOR);
      for (const element of classElements) {
        const code = getCodeFromClass(element);
        element.classList.add('is-clickable');
        element.classList.toggle('is-selected', code === selectedCode);
      }
    }

    applyMapClasses();

    /** 地図内クリックを選択イベントとして親へ通知 */
    function handleMapClick(event: Event) {
      const target = event.target as Element | null;
      if (!target) {
        return;
      }

      const byCode = target.closest('[data-code]');
      const byClass = CLASS_SELECTOR ? target.closest(CLASS_SELECTOR) : null;
      const clickedElement = byCode ?? byClass;
      if (!clickedElement) {
        return;
      }

      const selectedPrefecture = buildSelectedPrefecture(clickedElement);
      if (!selectedPrefecture) {
        return;
      }

      onSelect(selectedPrefecture);
    }

    mapElement.addEventListener('click', handleMapClick);

    return () => {
      mapElement.removeEventListener('click', handleMapClick);
    };
  }, [selectedCode, onSelect]);

  return (
    <div className="mapArea">
      <div
        ref={mapContainerRef}
        className="japanMap"
        dangerouslySetInnerHTML={{ __html: mapSvgRaw }}
      />
    </div>
  );
}

/** 都道府県選択と名産品表示を管理 */
function App() {
  const [selectedPrefecture, setSelectedPrefecture] = useState<SelectedPrefecture | null>(null);

  const selectedSpecialties = useMemo(() => {
    if (!selectedPrefecture) {
      return null;
    }

    const master = SPECIALTIES_BY_CODE[selectedPrefecture.code];
    return {
      name: master?.name ?? selectedPrefecture.name,
      specialties: master?.specialties ?? [],
    };
  }, [selectedPrefecture]);

  return (
    <main className="app">
      <h1 className="title">都道府県の名産品サンプル</h1>

      <JapanMap
        selectedCode={selectedPrefecture?.code ?? null}
        onSelect={setSelectedPrefecture}
      />

      <section className="panel">
        {!selectedSpecialties ? (
          <p className="empty">都道府県を選択してください</p>
        ) : (
          <>
            <h2 className="prefectureName">{selectedSpecialties.name}</h2>
            {selectedSpecialties.specialties.length > 0 ? (
              <ul className="specialtyList">
                {selectedSpecialties.specialties.map((specialty) => (
                  <li key={specialty}>{specialty}</li>
                ))}
              </ul>
            ) : (
              <p className="empty">データなし</p>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default App;

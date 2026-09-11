export interface LawProvision {
  title: string;
  description: string;
  simpleDescription?: string;
}

export interface FoundationLaw {
  id: string;
  name: string; // 法律正式名称（例: 所得税法）
  commonName?: string; // 通称・略称
  enactedYear: string; // 制定年（例: 1965年（昭和40年））
  ministry: string; // 主管官庁（例: 財務省（国税庁））
  catchphrase: string; // ひとことで言うと
  summary: {
    standard: string;
    simple: string;
  };
  purpose: {
    standard: string;
    simple: string;
  };
  currentChallenge: {
    standard: string; // なぜ今、この法律が見直されているのか
    simple: string;
  };
  keyProvisions: LawProvision[]; // 知っておきたい基本ルール（3点）
  officialUrl?: string; // e-Gov法令検索等の公式リンク
}

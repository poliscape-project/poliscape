/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Hotel, MapPin, Wallet, Sparkles, Users, Calendar } from "lucide-react";

export const AccommodationTaxCalculator: React.FC<{ isSimpleMode?: boolean }> = ({ isSimpleMode = false }) => {
  const [city, setCity] = useState<string>("kyoto"); // "tokyo", "kyoto", "osaka", "fukuoka", "niseko"
  const [roomPrice, setRoomPrice] = useState<number>(18000); // 1人1泊の宿泊費
  const [guests, setGuests] = useState<number>(2);
  const [nights, setNights] = useState<number>(2);

  // 各自治体の宿泊税計算
  const getTaxPerPersonNight = (selectedCity: string, price: number): number => {
    if (selectedCity === "tokyo") {
      if (price < 10000) return 0;
      if (price < 15000) return 100;
      return 200;
    } else if (selectedCity === "osaka") {
      if (price < 7000) return 0;
      if (price < 15000) return 100;
      if (price < 20000) return 200;
      return 300;
    } else if (selectedCity === "kyoto") {
      if (price < 20000) return 200;
      if (price < 50000) return 500;
      return 1000;
    } else if (selectedCity === "fukuoka") {
      if (price < 20000) return 200;
      return 500;
    } else if (selectedCity === "niseko") {
      // ニセコ町定率制（宿泊料の2%・上限2,000円）
      return Math.min(2000, Math.round(price * 0.02));
    }
    return 0;
  };

  const taxPerPersonNight = getTaxPerPersonNight(city, roomPrice);
  const totalTax = taxPerPersonNight * guests * nights;
  const totalAccommodation = roomPrice * guests * nights;
  const grandTotal = totalAccommodation + totalTax;

  return (
    <div className="bg-gradient-to-br from-sky-50/80 via-white to-blue-50/60 rounded-3xl p-5 sm:p-7 border border-sky-200/80 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-100 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-sky-600 text-white shadow-xs">
            <Hotel className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              {isSimpleMode ? "ホテルの宿泊税 計算機" : "全国自治体 宿泊税・観光税チェッカー"}
            </h3>
            <p className="text-xs text-slate-500">
              東京・京都・大阪・ニセコ等の自治体別宿泊税と旅行総額を即時計算
            </p>
          </div>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-bold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          全国30自治体へ拡大中
        </span>
      </div>

      {/* 設定フォーム */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600" />
            <span>旅行先の自治体</span>
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-sky-500"
          >
            <option value="kyoto">京都市（最高1,000円）</option>
            <option value="tokyo">東京都（100〜200円）</option>
            <option value="osaka">大阪府（100〜300円）</option>
            <option value="fukuoka">福岡市（200〜500円）</option>
            <option value="niseko">北海道ニセコ町（定率2%・最高2,000円）</option>
          </select>
          <p className="text-[10px] text-slate-400">※各自治体の条例に基づく税率</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-sky-600" />
              <span>1人1泊の宿泊費</span>
            </span>
            <span className="text-sky-700 font-black">{roomPrice.toLocaleString()}円</span>
          </label>
          <input
            type="range"
            min={5000}
            max={60000}
            step={1000}
            value={roomPrice}
            onChange={(e) => setRoomPrice(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-bold">
            <span>5千円</span>
            <span>2万円</span>
            <span>6万円</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>宿泊人数</span>
          </label>
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4].map((cnt) => (
              <button
                key={cnt}
                type="button"
                onClick={() => setGuests(cnt)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  guests === cnt
                    ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cnt}人
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 space-y-2">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>宿泊数</span>
          </label>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNights(n)}
                className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                  nights === n
                    ? "bg-sky-600 text-white border-sky-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {n}泊
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 計算結果カード */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-sky-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">1人1泊あたりの宿泊税</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-sky-700">
              {taxPerPersonNight.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {taxPerPersonNight === 0 ? "免税ライン（非課税）" : "チェックイン時に現地支払"}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-indigo-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">今回の旅行の宿泊税合計</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-indigo-700">
              {totalTax.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-indigo-700 font-bold mt-1">
            {guests}人 × {nights}泊 分の税金
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col justify-between">
          <div className="text-xs font-bold text-slate-500 mb-1">宿泊費込みの支払総額</div>
          <div className="flex items-baseline gap-1 my-1">
            <span className="text-3xl font-black text-emerald-700">
              {grandTotal.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-600">円</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            宿泊費: {totalAccommodation.toLocaleString()}円 ＋ 税金
          </div>
        </div>
      </div>

      {/* 税金の使途フッター */}
      <div className="bg-sky-950 text-white rounded-2xl p-4 text-xs space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-sky-300">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>集まった宿泊税は何に使われている？</span>
        </div>
        <p className="text-[11px] text-sky-100 leading-relaxed">
          市民の生活バスが観光客で満員になるのを防ぐ「観光特急バス」の運行補助、深夜早朝のゴミ回収や清潔な公衆トイレの整備、外国人向けの多言語案内サインや避難誘導システムの構築など、観光公害（オーバーツーリズム）の緩和に重点投資されています。
        </p>
      </div>
    </div>
  );
};
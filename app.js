// AI Prompt Studio - アプリケーションロジック

const TEMPLATES_DATA = {
  categories: [
    { id: "email", name: "メール・連絡", icon: "mail" },
    { id: "meeting", name: "議事録・要約", icon: "file-text" },
    { id: "planning", name: "企画・ブレスト", icon: "lightbulb" },
    { id: "data", name: "Excel・データ", icon: "table" },
    { id: "deep", name: "深層思考・分析", icon: "cpu" }
  ],
  templates: [
    // メールカテゴリ
    {
      id: "email_decline",
      categoryId: "email",
      name: "角を立てずに断る「スマート辞退＆代替案」",
      desc: "無理な値引きや急な依頼に対し、相手との関係を維持しながら丁寧に断り、代案を提示します。",
      role: "気配り上手なトップビジネスパーソン兼交渉のスペシャリスト",
      fields: [
        { id: "target_person", label: "相手の役職・関係性", placeholder: "例: 長年取引のあるクライアント担当者（部長）", default: "クライアント担当者様" },
        { id: "request_detail", label: "依頼された内容", placeholder: "例: 納期を3日前倒ししてほしいとの要望", default: "短納期での緊急納品依頼" },
        { id: "reason", label: "断る理由（差し支えない範囲）", placeholder: "例: 品質担保のための検証リソースが不足しているため", default: "品質検証工程の都合上、短縮が困難なため" },
        { id: "alternative", label: "提示する代替案", placeholder: "例: 優先度の高い第1部のみ先行納品する", default: "主要骨子のみ先行共有し、全体は当初期日で納品する" }
      ],
      generate: (vars, isXml) => {
        if (isXml) {
          return `<role>${vars.role}</role>
<context>
相手との良好な信頼関係を維持したまま、受託困難な依頼を丁寧に辞退し、かつ双方が納得できる前向きな代替案を提示するメールを作成します。
</context>
<input_data>
- 送信相手: ${vars.target_person}
- 依頼内容: ${vars.request_detail}
- 辞退の背景・理由: ${vars.reason}
- 提案する代替案: ${vars.alternative}
</input_data>
<constraints>
- 相手の立場や心情に十分配慮し、感謝と誠意を冒頭に伝えること
- 理由を客観的・建設的に述べ、単なる拒絶に終わらせないこと
- 代替案のメリットを簡潔に伝え、次の検討を促す結びとすること
</constraints>
<output_format>
件名案（2パターン）および本文（挨拶〜本題〜辞退理由〜代替案〜結び）を出力してください。
</output_format>`;
        } else {
          return `# 指示
あなたは【${vars.role}】です。
以下の情報に基づき、相手の面子を保ちつつ丁寧に依頼を辞退し、代替案を提示するビジネスマナーに富んだ返信メールを作成してください。

# 前提・入力情報
- 送信相手: ${vars.target_person}
- 依頼内容: ${vars.request_detail}
- 辞退理由: ${vars.reason}
- 代替案: ${vars.alternative}

# 制約事項
- 相手の急な相談に対する感謝と配慮を冒頭に述べること
- 角を立てず、業務品質を担保するための誠実な理由として説明すること
- 代替案を選択肢として自然に提案すること

# 出力形式
- 件名案（2パターン）
- メール本文`;
        }
      }
    },
    {
      id: "email_delay",
      categoryId: "email",
      name: "納期遅延・トラブル事前相談メール（炎上防止）",
      desc: "トラブル発生時、相手の不安を最小限に抑え、現実的な新納期と対策を誠実に伝えます。",
      role: "リスクマネジメントに長けたプロジェクトマネージャー",
      fields: [
        { id: "target_person", label: "連絡相手", placeholder: "例: 発注元クライアント、社内上司", default: "発注元クライアント様" },
        { id: "current_status", label: "現在の状況・進捗", placeholder: "例: 80%完成しているが仕様変更の影響でバグ発生", default: "主要機能の実装は完了しているが最終テストで不具合検知" },
        { id: "delay_reason", label: "遅延の要因", placeholder: "例: 外部APIの予期せぬ仕様変更対応のため", default: "外部連携部分の整合性検証に想定以上の工数を要するため" },
        { id: "new_deadline", label: "現実的な新納期", placeholder: "例: 当初予定の2日後（〇月〇日 17:00）", default: "2営業日後の18:00" },
        { id: "prevent_plan", label: "再発防止・リカバリー策", placeholder: "例: 担当者を2名増員して夜間テスト実施", default: "人員を追加アサインし、中間進捗を本日夕方に報告" }
      ],
      generate: (vars, isXml) => {
        if (isXml) {
          return `<role>${vars.role}</role>
<context>
納期の遅延が見込まれる状況において、事後報告ではなく「事前の誠意ある相談・報告」を行い、信頼関係の毀損を最小限に食い止めるメール文面を作成します。
</context>
<input_data>
- 宛先: ${vars.target_person}
- 現在の進捗: ${vars.current_status}
- 遅延要因: ${vars.delay_reason}
- 新納期目標: ${vars.new_deadline}
- リカバリー策: ${vars.prevent_plan}
</input_data>
<constraints>
- 冒頭で結論（納期の再調整の相談・お詫び）を明快に述べること
- 言い訳に終始せず、現状と挽回プランを具体的に提示すること
- 相手の確認負担を減らすため要点を箇条書きで整理すること
</constraints>
<output_format>
件名（緊急度と要件が即伝わるもの）およびメール本文を出力してください。
</output_format>`;
        } else {
          return `# 指示
あなたは【${vars.role}】です。
納期遅延の懸念が生じた際、クライアントに事前相談とお詫びを行い、リカバリープランを提示するメールを作成してください。

# 入力データ
- 宛先: ${vars.target_person}
- 現在の進捗: ${vars.current_status}
- 遅延要因: ${vars.delay_reason}
- 提示する新納期: ${vars.new_deadline}
- 対策・リカバリー策: ${vars.prevent_plan}

# 出力要件
- 件名（緊急性と案件名がわかるもの）
- 誠意とお詫び
- 現状・原因・対策・新期日の簡潔なまとめ
- 相手への確認・要望`;
        }
      }
    },

    // 議事録・要約カテゴリ
    {
      id: "meeting_summary",
      categoryId: "meeting",
      name: "会議文字起こしから「決定事項＆ToDo」即時抽出",
      desc: "散らかった会議の会話メモや文字起こしから、決定事項とネクストアクションだけを抽出します。",
      role: "論点整理の達人であるチーフエグゼクティブアシスタント",
      fields: [
        { id: "meeting_theme", label: "会議の主題・アジェンダ", placeholder: "例: Q3マーケティング予算配分ミーティング", default: "新規施策推進ミーティング" },
        { id: "transcript", label: "会話ログ・メモ（コピペ用枠）", placeholder: "ここにZoomやTeamsの文字起こしを貼り付けます", default: "【ここに会議の文字起こしテキストを貼り付けてください】" }
      ],
      generate: (vars, isXml) => {
        if (isXml) {
          return `<role>${vars.role}</role>
<context>
混沌とした会議の文字起こしログから雑談や脱線した議論を徹底的に削ぎ落とし、関係者が即座に行動できるアクションアジェンダを抽出します。
</context>
<input_data>
<meeting_theme>${vars.meeting_theme}</meeting_theme>
<transcript>
${vars.transcript}
</transcript>
</input_data>
<constraints>
- 結論・決定事項（Decisions）を最優先でリスト化すること
- ToDoには必ず「担当者（Who）」と「期日・期限（When）」を明記すること（言及がない場合は要確認と明記）
- 合意に至らなかった未決課題（Open Issues）を明確に分離すること
</constraints>
<output_format>
1. ミーティングサマリー（3行要約）
2. 決定事項一覧（箇条書き）
3. ToDoタスク一覧（タスク名 / 担当者 / 期日）
4. 次回検討・持ち越し課題
</output_format>`;
        } else {
          return `# 指示
以下の会議文字起こしから、重要事項のみを抽出して実戦的な議事録を作成してください。

# 会議テーマ
${vars.meeting_theme}

# 文字起こしデータ
${vars.transcript}

# 抽出・整理ルール
1. 【決定事項】合意された結論のみを端的に抽出
2. 【ToDoアクション】誰が・何を・いつまでにやるかをテーブルまたは箇条書き化
3. 【未決課題】ペンディングとなった議論を整理
4. 雑談や重複発言はすべてカットすること`;
        }
      }
    },

    // 企画・ブレストカテゴリ
    {
      id: "planning_devil",
      categoryId: "planning",
      name: "新規事業の弱点を暴く「悪魔の代弁者（辛口VC）」壁打ち",
      desc: "自社企画の甘い見通しを暴き、競合優位性やCAC（顧客獲得コスト）の壁を事前に炙り出します。",
      role: "百戦錬磨の辛口ベンチャーキャピタリスト（悪魔の代弁者）",
      fields: [
        { id: "business_idea", label: "企画・新規事業の概要", placeholder: "例: 中小企業向けAIバックオフィス自動化代行サービス", default: "個人事業主向けAIプロンプト作成・業務効率化サービス" },
        { id: "target_market", label: "ターゲット顧客・市場", placeholder: "例: 従業員10名未満の工務店や士業", default: "残業に悩むフリーランスおよびスモールビジネス経営者" },
        { id: "pricing", label: "想定価格・マネタイズ", placeholder: "例: 初期5万円＋月額1万円のサブスク", default: "買い切り2,980円〜9,800円のデジタル教材販売" }
      ],
      generate: (vars, isXml) => {
        if (isXml) {
          return `<role>${vars.role}</role>
<context>
お世辞やポジティブな励ましを一切排除し、事業が市場で失敗する構造的リスクを徹底的に批判・検証（Stress Test）します。
</context>
<input_data>
- 事業概要: ${vars.business_idea}
- ターゲット市場: ${vars.target_market}
- 価格・収益モデル: ${vars.pricing}
</input_data>
<constraints>
- お世辞や一般的な応援コメントは一切禁止
- 「競合優位性の欠如」「顧客獲得コスト（CAC）高騰」「LTV（顧客生涯価値）の限界」の3つの切り口から冷徹に弱点を突くこと
- 最後に、その弱点を克服して生存率を跳ね上げるための【逆転の一手（ピボット案）】を提示すること
</constraints>
<output_format>
1. 辛口総評（なぜこのままだと90%失敗するのか）
2. 3大構造的リスクと盲点
3. 生き残るための具体的ピボット戦略
</output_format>`;
        } else {
          return `# 指示
あなたは【${vars.role}】です。
以下の事業企画に対し、お世辞抜きの辛口レビューを行い、失敗確率の高いボトルネックを指摘してください。

# 企画概要
- 事業内容: ${vars.business_idea}
- ターゲット: ${vars.target_market}
- 価格・モデル: ${vars.pricing}

# 指摘要件
1. なぜ既存競合に押し潰されるリスクがあるか？
2. 集客とマネタイズで必ず直面する壁は何か？
3. この事業を大化けさせるための「独自の差別化の切り口」`;
        }
      }
    },

    // Excel・データカテゴリ
    {
      id: "data_excel_formula",
      categoryId: "data",
      name: "日本語から一瞬生成「Excel / スプレッドシート数式」",
      desc: "やりたい処理を日本語で書くだけで、壊れにくくモダンな関数（XLOOKUP, FILTER, LET等）を生成します。",
      role: "外資系データアナリスト兼Excel/スプレッドシートエキスパート",
      fields: [
        { id: "goal", label: "実現したいこと・処理内容", placeholder: "例: A列のIDが一致したら、別シートのC列の売上を取得して合計したい", default: "顧客IDをキーにして別シートから売上と担当者名を取得し、空欄ならハイフンを表示したい" },
        { id: "sheet_layout", label: "対象の列・シート構成", placeholder: "例: 元データはSheet1のA〜C列、出力先はSheet2のB列", default: "参照元: 'マスタ'シートのA列(ID), C列(売上), D列(担当者)。出力先: 現在のシートのA列(ID)" }
      ],
      generate: (vars, isXml) => {
        if (isXml) {
          return `<role>${vars.role}</role>
<context>
ExcelまたはGoogleスプレッドシートで、エラーに強く保守性の高い最適な最新数式を構築します。
</context>
<input_data>
- 目的・処理要件: ${vars.goal}
- シート・セル配置: ${vars.sheet_layout}
</input_data>
<constraints>
- 可能な限りモダンな関数（XLOOKUP, LET, FILTER, IFS等）を優先すること
- エラーハンドリング（#N/A対策など）を組み込むこと
- コピペ用コード枠と、数式の各引数の解説を明記すること
</constraints>
<output_format>
1. 推奨数式（コピペ用コードブロック）
2. 数式の解説（どの部分が何をしているか）
3. 旧バージョン（VLOOKUP等）との違い・注意点
</output_format>`;
        } else {
          return `# 指示
以下の要件を満たす、最もスマートで壊れにくいExcel / スプレッドシートの関数式を作成してください。

# 要件
- 実現したいこと: ${vars.goal}
- 対象レイアウト: ${vars.sheet_layout}

# 出力内容
- コピペ用数式（XLOOKUP等のモダン関数推奨）
- 動作解説
- 想定されるエラーと対策`;
        }
      }
    },

    // 深層思考カテゴリ
    {
      id: "deep_tot",
      categoryId: "deep",
      name: "多段階推論「思考の木（Tree of Thoughts: ToT）」",
      desc: "AIに3つの独立した仮説を立てさせ、比較検証させた上で最高精度のハイブリッド解を導きます。",
      role: "世界最高峰の戦略コンサルティングファーム・シニアパートナー",
      fields: [
        { id: "complex_problem", label: "解決したい複雑な課題・テーマ", placeholder: "例: 元手0円から最短で月利100万円を達成するための事業ポートフォリオ設計", default: "元手0円から最短で月利50万円を達成するための事業ポートフォリオ設計" },
        { id: "constraints_detail", label: "前提・制約条件", placeholder: "例: 初期費用0円、広告費ゼロ、既存のPCとAIのみ使用可能", default: "初期投資0円、在庫ゼロ、既存のPC環境とAIのみを活用" }
      ],
      generate: (vars, isXml) => {
        return `<role>${vars.role}</role>
<context>
一本道の短絡的な結論を排し、複数の多角的なアプローチを並行して発散・評価・統合する「思考の木（Tree of Thoughts）」を実行します。
</context>
<input_data>
<problem>${vars.complex_problem}</problem>
<constraints>${vars.constraints_detail}</constraints>
</input_data>
<thought_process>
以下の3つのフェーズで論理を展開してください。
【Phase 1: 仮説発散】
全く異なる3つの戦略的アプローチ（アプローチA: 即効受託型、アプローチB: デジタルアセット型、アプローチC: ツール/仕組み化型）を立案する。

【Phase 2: 批判的ストレステスト】
各アプローチの「強み」「隠れたリスク」「制約下での実現可能性」を10点満点で厳密にスコアリング・比較する。

【Phase 3: 最適ハイブリッド解の統合】
3つのアプローチの良いところを組み合わせ、リスクを最小化した「最も勝率の高い実行ロードマップ」を策定する。
</thought_process>
<output_format>
Phase 1からPhase 3までの思考の軌跡と、最終的な結論・アクションプランを出力してください。
</output_format>`;
      }
    }
  ]
};

// DOM要素
let currentCategory = "email";
let currentTemplateId = "email_decline";
let currentStyle = "standard";

const categorySelectorEl = document.getElementById("category-selector");
const templateSelectEl = document.getElementById("template-select");
const templateDescEl = document.getElementById("template-description");
const dynamicInputsEl = document.getElementById("dynamic-inputs");
const promptOutputEl = document.getElementById("prompt-output");
const copyBtnEl = document.getElementById("copy-btn");
const copyToastEl = document.getElementById("copy-toast");
const charCountEl = document.getElementById("char-count");

// 初期化
function init() {
  renderCategories();
  renderTemplateOptions();
  renderFormFields();
  generatePrompt();
  setupEventListeners();
  lucide.createIcons();
}

// カテゴリボタンの描画
function renderCategories() {
  categorySelectorEl.innerHTML = "";
  TEMPLATES_DATA.categories.forEach(cat => {
    const btn = document.createElement("button");
    const isActive = cat.id === currentCategory;
    btn.className = `flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold border transition ${
      isActive
        ? "bg-brand-600/20 text-brand-400 border-brand-500/40 shadow-sm"
        : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
    }`;
    btn.innerHTML = `<i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i><span>${cat.name}</span>`;
    btn.onclick = () => {
      currentCategory = cat.id;
      renderCategories();
      renderTemplateOptions();
      renderFormFields();
      generatePrompt();
      lucide.createIcons();
    };
    categorySelectorEl.appendChild(btn);
  });
}

// テンプレートセレクトの更新
function renderTemplateOptions() {
  templateSelectEl.innerHTML = "";
  const filtered = TEMPLATES_DATA.templates.filter(t => t.categoryId === currentCategory);
  filtered.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.id;
    opt.textContent = t.name;
    templateSelectEl.appendChild(opt);
  });
  if (filtered.length > 0) {
    currentTemplateId = filtered[0].id;
    updateTemplateDesc();
  }
}

function updateTemplateDesc() {
  const currentTmpl = TEMPLATES_DATA.templates.find(t => t.id === currentTemplateId);
  if (currentTmpl) {
    templateDescEl.textContent = currentTmpl.desc;
  }
}

// 動的入力フィールドの描画
function renderFormFields() {
  dynamicInputsEl.innerHTML = "";
  const currentTmpl = TEMPLATES_DATA.templates.find(t => t.id === currentTemplateId);
  if (!currentTmpl) return;

  currentTmpl.fields.forEach(field => {
    const wrap = document.createElement("div");
    wrap.className = "flex flex-col gap-1.5";
    
    const label = document.createElement("label");
    label.className = "text-xs font-semibold text-slate-300";
    label.textContent = field.label;

    let input;
    if (field.id === "transcript" || field.id === "complex_problem") {
      input = document.createElement("textarea");
      input.rows = 3;
      input.className = "w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 text-slate-200 resize-none";
    } else {
      input = document.createElement("input");
      input.type = "text";
      input.className = "w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-brand-500 text-slate-200";
    }
    input.id = `input-${field.id}`;
    input.value = field.default || "";
    input.placeholder = field.placeholder || "";
    input.oninput = () => generatePrompt();

    wrap.appendChild(label);
    wrap.appendChild(input);
    dynamicInputsEl.appendChild(wrap);
  });
}

// プロンプト生成実行
function generatePrompt() {
  const currentTmpl = TEMPLATES_DATA.templates.find(t => t.id === currentTemplateId);
  if (!currentTmpl) return;

  const vars = { role: currentTmpl.role };
  currentTmpl.fields.forEach(f => {
    const el = document.getElementById(`input-${f.id}`);
    vars[f.id] = el && el.value.trim() ? el.value.trim() : (f.default || "");
  });

  const isXml = currentStyle === "xml";
  const output = currentTmpl.generate(vars, isXml);
  promptOutputEl.value = output;
  charCountEl.textContent = `${output.length} 文字`;
}

// イベントリスナー設定
function setupEventListeners() {
  templateSelectEl.onchange = (e) => {
    currentTemplateId = e.target.value;
    updateTemplateDesc();
    renderFormFields();
    generatePrompt();
  };

  document.querySelectorAll('input[name="output_style"]').forEach(radio => {
    radio.onchange = (e) => {
      currentStyle = e.target.value;
      generatePrompt();
    };
  });

  copyBtnEl.onclick = () => {
    if (!promptOutputEl.value) return;
    navigator.clipboard.writeText(promptOutputEl.value).then(() => {
      copyToastEl.classList.remove("hidden");
      copyToastEl.classList.add("flex");
      setTimeout(() => {
        copyToastEl.classList.add("hidden");
        copyToastEl.classList.remove("flex");
      }, 2500);
    });
  };
}

// 実行開始
window.onload = init;

// AI Prompt Studio - アプリケーションロジック v2.0 (全12種の実戦テンプレート)

const TEMPLATES_DATA = {
  categories: [
    { id: "email", name: "メール・連絡", icon: "mail" },
    { id: "meeting", name: "議事録・要約", icon: "file-text" },
    { id: "planning", name: "企画・ブレスト", icon: "lightbulb" },
    { id: "data", name: "Excel・自動化", icon: "table" },
    { id: "deep", name: "深層推論・監査", icon: "cpu" }
  ],
  templates: [
    // ----------------------------------------------------
    // メールカテゴリ
    // ----------------------------------------------------
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
- 相手の急な相談に対する感謝と配慮を冒頭に述べること
- 角を立てず、業務品質を担保するための誠実な理由として説明すること
- 代替案を選択肢として自然に提案すること
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
        return isXml
          ? `<role>${vars.role}</role>
<context>納期の遅延が見込まれる状況において、事後の言い訳ではなく事前の誠意ある相談を行い、信頼を維持する文面を作成します。</context>
<input_data>
- 宛先: ${vars.target_person}
- 現状進捗: ${vars.current_status}
- 遅延要因: ${vars.delay_reason}
- 新納期目標: ${vars.new_deadline}
- リカバリー策: ${vars.prevent_plan}
</input_data>
<constraints>
- 冒頭で結論（納期の再調整の相談・お詫び）を明快に述べること
- 現状と挽回プランを具体的に提示すること
</constraints>
<output_format>件名（緊急度と案件名が即伝わるもの）およびメール本文を出力してください。</output_format>`
          : `# 指示\nあなたは【${vars.role}】です。納期遅延の事前相談とお詫びを行い、リカバリー策を提示するメールを作成してください。\n\n# 入力情報\n- 宛先: ${vars.target_person}\n- 進捗: ${vars.current_status}\n- 遅延要因: ${vars.delay_reason}\n- 新納期: ${vars.new_deadline}\n- 挽回策: ${vars.prevent_plan}\n\n# 出力形式\n- 件名案\n- 本文`;
      }
    },
    {
      id: "email_outreach",
      categoryId: "email",
      name: "新規開拓・アポ獲得コールドメール（決裁者向け）",
      desc: "多忙な経営者・決裁者が思わず返信したくなる、短文で強烈な価値を伝える提案文です。",
      role: "成約率上位1%のトップB2Bインサイドセールス",
      fields: [
        { id: "target_person", label: "送信先の役職・業界", placeholder: "例: 従業員30名規模のIT企業 経営者様", default: "中小企業 経営者様" },
        { id: "pain_point", label: "相手が抱えている想定の悩み", placeholder: "例: バックオフィスの手作業が多く残業代が高騰している", default: "ルーティン業務の属人化と人手不足に悩んでいる" },
        { id: "solution_hook", label: "こちらが提供できる具体的ベネフィット", placeholder: "例: 既存の業務フローを変えずに月80時間削減した実績", default: "月80時間の残業を0円インフラ×AIで削減した具体的事例の共有" }
      ],
      generate: (vars, isXml) => {
        return isXml
          ? `<role>${vars.role}</role>
<context>多忙な決裁者がスマホで10秒で読め、「話だけでも聞いてみるか」と返信したくなる高成約コールドメールを作成します。</context>
<input_data>
- 送信対象: ${vars.target_person}
- 相手のペイン: ${vars.pain_point}
- 提供価値: ${vars.solution_hook}
</input_data>
<constraints>
- 売り込み感を排除し、「他社成功事例の情報提供」というギブのスタンスをとること
- 本文は200〜300文字以内で、スクロール不要で完結させること
- CTA（行動喚起）は「15分間のオンライン面談」または「資料提供」の低ハードル設計にすること
</constraints>
<output_format>
開封率30%超を狙う件名案（3パターン）およびメール本文を出力してください。
</output_format>`
          : `# 指示\nあなたは【${vars.role}】です。決裁者向けに短文で刺さるアポ獲得メールを作成してください。\n\n# 前提\n- 宛先: ${vars.target_person}\n- 相手の課題: ${vars.pain_point}\n- 提示ベネフィット: ${vars.solution_hook}\n\n# 要件\n- 本文250文字以内の短文\n- 売り込まず事例共有のスタンス\n- 件名3パターン`;
      }
    },

    // ----------------------------------------------------
    // 議事録・要約カテゴリ
    // ----------------------------------------------------
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
        return isXml
          ? `<role>${vars.role}</role>
<context>混沌とした会議文字起こしから雑談を削ぎ落とし、関係者が即座に行動できるアクションアジェンダを抽出します。</context>
<input_data>
<theme>${vars.meeting_theme}</theme>
<transcript>
${vars.transcript}
</transcript>
</input_data>
<constraints>
- 結論・決定事項（Decisions）を最優先でリスト化
- ToDoには必ず「担当者（Who）」と「期日（When）」を明記
- 未決課題（Open Issues）を明確に分離
</constraints>
<output_format>
1. ミーティングサマリー（3行要約）
2. 決定事項一覧（箇条書き）
3. ToDoタスク一覧（タスク名 / 担当者 / 期日）
4. 次回検討・持ち越し課題
</output_format>`
          : `# 指示\n以下の会議文字起こしから、重要事項のみを抽出して実戦的な議事録を作成してください。\n\n# テーマ: ${vars.meeting_theme}\n# 文字起こし:\n${vars.transcript}\n\n# 抽出項目\n1. 3行サマリー\n2. 決定事項\n3. ToDo（担当者・期日つき）\n4. 保留課題`;
      }
    },
    {
      id: "meeting_3line_exec",
      categoryId: "meeting",
      name: "忙しい役員向け「3行エグゼクティブサマリー」",
      desc: "数千文字の長文資料や長時間の報告を、1分で意思決定できる極限の3行に圧縮します。",
      role: "経営企画室長・シニア戦略アドバイザー",
      fields: [
        { id: "report_content", label: "要約対象の長文レポート・資料テキスト", placeholder: "資料本文や週報・報告書を貼り付けます", default: "【ここに要約したい長文レポートや資料テキストを貼り付けてください】" }
      ],
      generate: (vars, isXml) => {
        return isXml
          ? `<role>${vars.role}</role>
<context>忙しい役員・経営陣が10秒で全体の要諦と意思決定ポイントを掴めるように、極限まで無駄を削ぎ落とした3行サマリーを生成します。</context>
<input_data>
${vars.report_content}
</input_data>
<constraints>
- 1行目: 【結論・最重要事実】何が起きたか／何が決定されたか
- 2行目: 【背景・要因】なぜそうなったのか（定量的根拠を含む）
- 3行目: 【経営判断・ネクストアクション】経営陣が今判断・承認すべきこと
- 各行は50〜80文字程度で、極めてシャープな体言止め・要約文とすること
</constraints>
<output_format>
【エグゼクティブサマリー（3行要約）】
1. 
2. 
3. 
【補足の定量的ポイント（3点）】
</output_format>`
          : `# 指示\n以下の資料を、多忙な役員向けに「極限の3行エグゼクティブサマリー」に圧縮してください。\n\n# 対象資料:\n${vars.report_content}\n\n# 構成要件:\n1行目: 結論・最重要トピック\n2行目: 背景と定量的要因\n3行目: 経営判断・承認が必要な事項`;
      }
    },

    // ----------------------------------------------------
    // 企画・ブレストカテゴリ
    // ----------------------------------------------------
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
        return isXml
          ? `<role>${vars.role}</role>
<context>お世辞やポジティブな励ましを一切排除し、事業が市場で失敗する構造的リスクを徹底的に批判・検証（Stress Test）します。</context>
<input_data>
- 事業概要: ${vars.business_idea}
- ターゲット市場: ${vars.target_market}
- 価格・収益モデル: ${vars.pricing}
</input_data>
<constraints>
- お世辞や一般的な応援コメントは一切禁止
- 「競合優位性の欠如」「顧客獲得コスト（CAC）高騰」「LTVの限界」の3つの切り口から冷徹に弱点を突くこと
- 最後に、その弱点を克服して生存率を跳ね上げるための【逆転の一手（ピボット案）】を提示すること
</constraints>
<output_format>
1. 辛口総評（なぜこのままだと90%失敗するのか）
2. 3大構造的リスクと盲点
3. 生き残るための具体的ピボット戦略
</output_format>`
          : `# 指示\nあなたは【${vars.role}】です。以下の事業企画に対し、お世辞抜きの辛口レビューを行い、失敗確率の高いボトルネックを指摘してください。\n\n# 企画概要\n- 事業内容: ${vars.business_idea}\n- ターゲット: ${vars.target_market}\n- 価格・モデル: ${vars.pricing}\n\n# 指摘要件\n1. 競合に押し潰されるリスク\n2. 集客とマネタイズの壁\n3. 逆転のピボット差別化案`;
      }
    },
    {
      id: "planning_sns_viral",
      categoryId: "planning",
      name: "SNS（X/Threads）読まれる「バズ構成・保存推奨ポスト」",
      desc: "フック、共感、箇条書きノウハウ、保存推奨CTAまで、インプレッションとブックマークを最大化する構成です。",
      role: "月間1,000万インプレッションを誇るSNSグロースハッカー",
      fields: [
        { id: "topic", label: "発信したいテーマ・ノウハウ", placeholder: "例: ChatGPTで残業をゼロにするExcel時短術", default: "ChatGPTで定時退社を勝ち取る現場プロンプト術" },
        { id: "target_reader", label: "届けたい読者像", placeholder: "例: 毎日2時間残業している20〜30代の会社員", default: "ルーティン業務に追われて時間が足りないデスクワーカー" },
        { id: "key_takeaway", label: "読者が得られる最大のメリット", placeholder: "例: コピペで使える数式や文章で即日残業が消滅する", default: "コピペするだけで今日の残業が1時間削れる実戦テクニック" }
      ],
      generate: (vars, isXml) => {
        return isXml
          ? `<role>${vars.role}</role>
<context>ThreadsやXで保存（ブックマーク）とリポストを爆発させ、プロフ遷移やnote購入へ導くキラーポストを設計します。</context>
<input_data>
- テーマ: ${vars.topic}
- ターゲット: ${vars.target_reader}
- コアベネフィット: ${vars.key_takeaway}
</input_data>
<constraints>
- 冒頭1行でスクロールの手を止めさせる強烈なフック（常識の否定や強烈な数字）
- スマホ画面で一瞬で頭に入る改行・箇条書きレイアウト
- 読了後に「あとで見返そう」と思わせる保存（ブクマ）推奨の仕掛け
</constraints>
<output_format>
切り口の異なる3パターンの投稿文（フック型、箇条書きノウハウ型、ストーリー型）を出力してください。
</output_format>`
          : `# 指示\nあなたは【${vars.role}】です。Threads/Xでブックマークされる有益ポストを作成してください。\n\n# 前提\n- テーマ: ${vars.topic}\n- 読者: ${vars.target_reader}\n- メリット: ${vars.key_takeaway}\n\n# 構成ルール\n- 冒頭フック\n- 箇条書きノウハウ\n- 保存（ブクマ）推奨CTA\n- 3パターン作成`;
      }
    },
    {
      id: "planning_3c_matrix",
      categoryId: "planning",
      name: "競合他社を丸裸にする「3C分析＆差別化マップ」",
      desc: "市場（Customer）、競合（Competitor）、自社（Company）を整理し、勝てるブルーオーシャンを特定します。",
      role: "大手戦略ファーム出身のチーフマーケティングストラテジスト",
      fields: [
        { id: "my_service", label: "自社サービス・商材", placeholder: "例: ビジネス特化型AIプロンプト集＆自動化支援", default: "元手0円で始めるAI業務自動化・プロンプトテンプレート集" },
        { id: "competitors", label: "想定される競合他社・代替品", placeholder: "例: 大手プログラミングスクール、汎用AI本、無料SNS投稿", default: "一般の無料AIブログ、高額なプロンプト販売講座、大手ITコンサル" }
      ],
      generate: (vars, isXml) => {
        return isXml
          ? `<role>${vars.role}</role>
<context>市場機会と競合の弱点を構造化し、自社が独占できる独自の提供価値（USP）を浮き彫りにする3C分析を実行します。</context>
<input_data>
- 自社商材: ${vars.my_service}
- 主な競合: ${vars.competitors}
</input_data>
<output_format>
1. 3C分析マトリクス（顧客ニーズの未充足点 / 競合の弱点・隙 / 自社の強み）
2. 競合が真似できない「独自のポジショニング軸」
3. マーケティングにおけるキラー訴求メッセージ
</output_format>`
          : `# 指示\n以下の商材について3C分析を実施し、競合差別化の勝ち筋を整理してください。\n\n# 自社商材: ${vars.my_service}\n# 競合他社: ${vars.competitors}\n\n# 出力要件\n- 3C分析表\n- ポジショニングマップの軸\n- 勝てるコアメッセージ`;
      }
    },

    // ----------------------------------------------------
    // Excel・自動化カテゴリ
    // ----------------------------------------------------
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
        return isXml
          ? `<role>${vars.role}</role>
<context>ExcelまたはGoogleスプレッドシートで、エラーに強く保守性の高い最適な最新数式を構築します。</context>
<input_data>
- 目的・処理要件: ${vars.goal}
- シート・セル配置: ${vars.sheet_layout}
</input_data>
<constraints>
- 可能な限りモダンな関数（XLOOKUP, LET, FILTER, IFS等）を優先すること
- エラーハンドリング（#N/A対策など）を組み込むこと
</constraints>
<output_format>
1. 推奨数式（コピペ用コードブロック）
2. 数式の解説（どの部分が何をしているか）
3. 旧バージョン（VLOOKUP等）との違い・注意点
</output_format>`
          : `# 指示\n以下の要件を満たす、壊れにくいモダンなExcel / スプシ関数を作成してください。\n\n# 要件: ${vars.goal}\n# 配置: ${vars.sheet_layout}\n\n# 出力\n- コピペ数式\n- 各引数の解説\n- エラー回避策`;
      }
    },
    {
      id: "data_gas_script",
      categoryId: "data",
      name: "非エンジニア用「Google Apps Script (GAS) 自動化コード」",
      desc: "スプレッドシートやGmailの反復作業をワンクリックで自動化するコピペ用GASスクリプトを生成します。",
      role: "Google Cloud 認定プロフェッショナル・自動化アーキテクト",
      fields: [
        { id: "auto_task", label: "自動化したいタスク内容", placeholder: "例: スプレッドシートのステータスが完了になったら、Slack/Gmailに自動通知したい", default: "スプレッドシートに入力されたURLの一覧を読み込み、Gemini APIを使って要約を隣のセルに書き込む" }
      ],
      generate: (vars, isXml) => {
        return isXml
          ? `<role>${vars.role}</role>
<context>非エンジニアでもコピペするだけで即座に安全に動作するGoogle Apps Script（GAS）コードを構築します。</context>
<input_data>
- 自動化したい処理: ${vars.auto_task}
</input_data>
<constraints>
- エラー処理（try/catch）を必ず実装すること
- 変数名やシート名は冒頭の設定エリア（CONFIG定数）にまとめ、誰でも編集しやすくすること
</constraints>
<output_format>
1. 完全なGASソースコード（コメント付き）
2. スプレッドシートへの導入手順（拡張機能 > Apps Script への貼り付けガイド）
3. 初回実行時の権限承認（許可）の流れ
</output_format>`
          : `# 指示\n非エンジニア向けに、コピペで動くGoogle Apps Script (GAS) コードを作成してください。\n\n# 自動化要件:\n${vars.auto_task}\n\n# 出力要件:\n- 完全なGASスクリプト\n- 設定手順\n- 権限承認の解説`;
      }
    },

    // ----------------------------------------------------
    // 深層推論・監査カテゴリ
    // ----------------------------------------------------
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
【Phase 1: 仮説発散】全く異なる3つの戦略的アプローチ（アプローチA、B、C）を立案する。
【Phase 2: 批判的ストレステスト】各アプローチの「強み」「隠れたリスク」「制約下での実現可能性」を10点満点で厳密にスコアリング・比較する。
【Phase 3: 最適ハイブリッド解の統合】3つのアプローチの良いところを組み合わせ、リスクを最小化した「最も勝率の高い実行ロードマップ」を策定する。
</thought_process>
<output_format>
Phase 1からPhase 3までの思考の軌跡と、最終的な結論・アクションプランを出力してください。
</output_format>`;
      }
    },
    {
      id: "deep_critique_refine",
      categoryId: "deep",
      name: "ハルシネーション完全撲滅「自己監査＆推敲（Critique & Refine）構文」",
      desc: "AIに知ったかぶりをさせず、一度自分で回答を自己批判・ファクトチェックさせてから出力させます。",
      role: "厳格無比なファクトチェッカー兼シニアコンプライアンスオフィサー",
      fields: [
        { id: "audit_target", label: "分析・調査・執筆したい重要テーマ", placeholder: "例: 最新の生成AI著作権ガイドラインに関する企業の法務リスク分析", default: "生成AIを活用したコンテンツ販売における著作権・商標権リスクと回避策" }
      ],
      generate: (vars, isXml) => {
        return `<role>${vars.role}</role>
<context>
事実誤認やもっともらしい嘘（ハルシネーション）を極限まで排除するため、AIが自らの回答を厳格に監査してから最終出力する多段ループを実行します。
</context>
<input_data>
${vars.audit_target}
</input_data>
<thought_process>
1. 【Draft】まず対象テーマについて網羅的な一次回答を作成せよ。
2. 【Critique（自己監査）】一次回答を批判的に監査し、「推測で補完している箇所」「曖昧な記述」「論理の飛躍」を指摘せよ。
3. 【Refine（最終推敲）】監査で指摘された欠点を完全に修正し、確証のある事実のみを残した高信頼性のアウトプットへ再構築せよ。
</thought_process>
<constraints>
- 確信が持てない事項は「現時点で公式見解なし」「諸説あり」と明記すること
- 推測による断定を一切禁止する
</constraints>
<output_format>
【自己監査レポート（一次回答の課題点）】
【最終監査済みアウトプット】
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
const templateCountBadgeEl = document.getElementById("template-count-badge");
const dynamicInputsEl = document.getElementById("dynamic-inputs");
const promptOutputEl = document.getElementById("prompt-output");
const copyBtnEl = document.getElementById("copy-btn");
const copyToastEl = document.getElementById("copy-toast");
const charCountEl = document.getElementById("char-count");
const resetInputsBtnEl = document.getElementById("reset-inputs-btn");

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
    const count = TEMPLATES_DATA.templates.filter(t => t.categoryId === cat.id).length;
    btn.className = `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold border transition ${
      isActive
        ? "bg-brand-600/20 text-brand-400 border-brand-500/40 shadow-sm"
        : "bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
    }`;
    btn.innerHTML = `
      <div class="flex items-center gap-2">
        <i data-lucide="${cat.icon}" class="w-3.5 h-3.5"></i>
        <span>${cat.name}</span>
      </div>
      <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-brand-500/30 text-brand-300' : 'bg-slate-800 text-slate-500'}">${count}</span>
    `;
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
  if (templateCountBadgeEl) {
    templateCountBadgeEl.textContent = `全${TEMPLATES_DATA.templates.length}種`;
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
    if (field.id === "transcript" || field.id === "complex_problem" || field.id === "report_content") {
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

  if (resetInputsBtnEl) {
    resetInputsBtnEl.onclick = () => {
      renderFormFields();
      generatePrompt();
    };
  }

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

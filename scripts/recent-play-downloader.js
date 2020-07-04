(function(){
  const queryParams = new URLSearchParams(document.location.search);
  let LANG = "en";
  if (queryParams.get("hl")) {
    LANG = queryParams.get("hl").startsWith("zh") ? "zh" : "en";
  } else if (navigator.language.startsWith("zh")) {
    LANG = "zh";
  }
  const UI_STRINGS = {
    zh: {
      date: "日期",
      songName: "歌曲",
      difficulty: "難度",
      achievement: "達成率",
      stamps: "成就",
      playDate: "遊玩日期：",
      newRecordToggleHeading: "顯示：",
      sortBy: "排序方式：",
      newRecordsOnly: "只顯示新高分紀錄",
      allRecords: "全部",
      olderFirst: "由舊到新",
      newerFirst: "由新到舊",
      copy: "複製",
      copied: "已複製到剪貼簿",
    },
    en: {
      date: "Date",
      songName: "Song",
      difficulty: "Difficulty",
      achievement: "Achv",
      stamps: "Grade",
      playDate: "Play date:",
      newRecordToggleHeading: "Display:",
      sortBy: "Sort by:",
      newRecordsOnly: "New records only",
      allRecords: "All",
      olderFirst: "Older first",
      newerFirst: "Newer first",
      copy: "Copy",
      copied: "Copied to clipboard",
    }
  }[LANG];
  
  const AP_FC_IMG_NAME_TO_TEXT = new Map([
    ["fc", "FC"],
    ["fcplus", "FC+"],
    ["ap", "AP"],
    ["applus", "AP+"],
  ]);

  const FS_FDX_IMG_NAME_TO_TEXT = new Map([
    ["fs", "FULL SYNC"],
    ["fsplus", "FULL SYNC+"],
    ["fsd", "FULL SYNC DX"],
    ["fsdplus", "FULL SYNC DX+"],
  ]);

  const DATE_CHECKBOX_CLASSNAME = "dateCheckbox";
  const NEW_RECORD_RADIO_NAME = "newRecordRadio";
  const SORT_BY_RADIO_NAME = "sortByRadio";
  const SCORE_RECORD_ROW_CLASSNAME = "recordRow";
  const SCORE_RECORD_CELL_BASE_CLASSNAME = "recordCell";
  const SCORE_RECORD_CELL_CLASSNAMES = [
    "dateCell",
    "songTitleCell",
    "difficultyCell",
    "achievementCell",
    "stampsCell",
  ];

  const DIFFICULTY_CLASSNAME_MAP = new Map([
    ["Re:MASTER", "remaster"],
    ["MASTER", "master"],
    ["EXPERT", "expert"],
    ["ADVANCED", "advanced"],
  ]);

  const ce = document.createElement.bind(document);
  
  function padNumberWithZeros(n, len) {
    len = len || 2;
    return n.toString().padStart(len, '0');
  }

  function getPlayDate(row) {
    const playDateText = row.querySelector(".sub_title").children[1].innerText;
    const m = playDateText.match(/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/);
    const japanDt = new Date(
      parseInt(m[1]),
      parseInt(m[2])-1,
      parseInt(m[3]),
      parseInt(m[4]),
      parseInt(m[5])
    );
    return new Date(japanDt.valueOf() - 1000 * 60 * 60);
  }

  function getSongName(row) {
    return row.querySelector(".m_5.p_5.f_13").childNodes[1].wholeText
  }

  function getSongImgSrc(row) {
    return row.querySelector(".music_img").src;
  }

  function getDifficulty(row) {
    const recordBody = row.children[1];
    const cn = recordBody.className;
    let diff = cn.substring(cn.indexOf("_") + 1, cn.lastIndexOf("_"));
    diff = diff === "remaster" ? "Re:MASTER" : diff.toUpperCase();
    const isDxChart = row.querySelector(".playlog_music_kind_icon").src.endsWith("music_dx.png");
    return isDxChart ? "DX " + diff : diff;
  }

  function getAchievement(row) {
    return parseFloat(row.querySelector(".playlog_achievement_txt").innerText);
  }

  function getStamps(row) {
    const rankImgSrc = row.querySelector("img.playlog_scorerank").src;
    const rank = rankImgSrc.substring(rankImgSrc.lastIndexOf("/")+1, rankImgSrc.lastIndexOf(".")).replace("plus", "+").toUpperCase()
    const stampImgs = row.querySelectorAll(".playlog_result_innerblock > img");
    const fcapSrc = stampImgs[0].src;
    const fcapImgName = fcapSrc.substring(fcapSrc.lastIndexOf("/")+1, fcapSrc.lastIndexOf("."));
    const fullSyncSrc = stampImgs[1].src;
    const fullSyncImgName = fullSyncSrc.substring(fullSyncSrc.lastIndexOf("/")+1, fullSyncSrc.lastIndexOf("."));
    let result = rank;
    if (AP_FC_IMG_NAME_TO_TEXT.has(fcapImgName)) {
      result += " / " + AP_FC_IMG_NAME_TO_TEXT.get(fcapImgName);
    }
    if (FS_FDX_IMG_NAME_TO_TEXT.has(fullSyncImgName)) {
      result += " / " + FS_FDX_IMG_NAME_TO_TEXT.get(fullSyncImgName);
    }
    return result;
  }

  function getIsNewRecord(row) {
    return !!row.querySelector(".playlog_achievement_label_block + img.playlog_achievement_newrecord");
  }
  
  function collectRecentPlays() {
    const scoreList = document.querySelector(".main_wrapper").querySelectorAll(".p_10.t_l.f_0.v_b")
    const results = [];
    scoreList.forEach((row) => {
      results.push(
        {
          date: getPlayDate(row),
          songName: getSongName(row),
          songImgSrc: getSongImgSrc(row),
          difficulty: getDifficulty(row),
          achievement: getAchievement(row),
          stamps: getStamps(row),
          isNewRecord: getIsNewRecord(row),
        }
      );
    });
    results.reverse();
    return results;
  }

  function formatDate(dt) {
    return (
      dt.getFullYear()
      + "-"
      + padNumberWithZeros(dt.getMonth() + 1)
      + "-"
      + padNumberWithZeros(dt.getDate())
      + " "
      + padNumberWithZeros(dt.getHours())
      + ":"
      + padNumberWithZeros(dt.getMinutes())
    );
  }

  function _renderScoreRowHelper(columnValues, rowClassnames, isHeading) {
    const tr = ce("tr");
    for (const cn of rowClassnames) {
      tr.classList.add(cn);
    }
    columnValues.forEach((v, index) => {
      const cell = ce(isHeading ? "th" : "td");
      if (v instanceof Array) {
        v.forEach((elem) => cell.append(elem));
      } else {
        cell.append(v);
      }
      cell.classList.add(SCORE_RECORD_CELL_BASE_CLASSNAME);
      cell.classList.add(SCORE_RECORD_CELL_CLASSNAMES[index]);
      tr.append(cell);
    });
    return tr;
  }

  function renderScoreHeadRow() {
    return _renderScoreRowHelper(
      [
        UI_STRINGS.date,
        UI_STRINGS.songName,
        UI_STRINGS.difficulty,
        UI_STRINGS.achievement,
        UI_STRINGS.stamps
      ],
      [],
      true
    );
  }

  function renderScoreRow(record) {
    const difficultyWithoutDxPrefix = record.difficulty.split(" ").pop();
    const songImg = ce("img");
    songImg.className = "m_r_5 p_l_5 songImg";
    songImg.src = record.songImgSrc;
    return _renderScoreRowHelper(
      [
        formatDate(record.date),
        [songImg, record.songName],
        record.difficulty,
        record.achievement.toFixed(4) + "%",
        record.stamps,
      ],
      [SCORE_RECORD_ROW_CLASSNAME, DIFFICULTY_CLASSNAME_MAP.get(difficultyWithoutDxPrefix)],
      false
    );
  }

  function renderTopScores(records, options, thead, tbody) {
    thead.innerHTML = "";
    tbody.innerHTML = "";
    thead.append(renderScoreHeadRow());
    console.log(options);
    if (options.dates) {
      records = records.filter((r) => {
        return options.dates.has(formatDate(r.date).split(" ")[0]);
      });
    }
    if (!options.showAll) {
      const nameRecordMap = new Map();
      records.forEach((r) => {
        if (r.isNewRecord) {
          const mapKey = r.difficulty + " " + r.songName;
          nameRecordMap.delete(mapKey);
          nameRecordMap.set(mapKey, r);
        }
      });
      records = [];
      nameRecordMap.forEach((r) => {
        records.push(r);
      });
    }
    if (!options.olderFirst) {
      records.reverse();
    }
    records.forEach((r, index) => {
      tbody.append(renderScoreRow(r))
    });
    if (!options.olderFirst) {
      records.reverse();
    }
  }

  function getFilterAndOptions(dateSelect) {
    const dateOptions = document.querySelectorAll("input." + DATE_CHECKBOX_CLASSNAME);
    const selectedDates = new Set();
    dateOptions.forEach((op) => {
      if (op.checked) {
        selectedDates.add(op.value);
      }
    });
    let showAllRecords = false;
    const newRecordRadios = document.getElementsByName(NEW_RECORD_RADIO_NAME);
    newRecordRadios.forEach((r) => {
      if (r.checked) {
        showAllRecords = r.value === "allRecords";
      }
    });
    let olderFirst = true;
    const sortByRadios = document.getElementsByName(SORT_BY_RADIO_NAME);
    sortByRadios.forEach((r) => {
      if (r.checked) {
        olderFirst = r.value === "olderFirst";
      }
    });
    return {dates: selectedDates, showAll: showAllRecords, olderFirst};
  }
  
  function createDateOptions(playDates, onChange) {
    const div = ce("div");
    div.className = "m_b_10 dateOptionsContainer";
    const heading = ce("div");
    heading.className = "t_c m_5";
    heading.append(UI_STRINGS.playDate);
    div.append(heading);
    playDates.forEach((d) => {
      const label = ce("label");
      label.className = "f_14 dateOptionLabel";
      const checkbox = ce("input");
      checkbox.type = "checkbox";
      checkbox.className = DATE_CHECKBOX_CLASSNAME;
      checkbox.value = d;
      checkbox.checked = true;
      checkbox.addEventListener("change", onChange);
      label.append(checkbox, d);
      div.append(label);
    });
    return div;
  }

  function createNewRecordToggle(onChange) {
    const div = ce("div");
    div.className = "m_b_10 newRecordToggleContainer";
    const heading = ce("div");
    heading.className = "t_c m_5";
    heading.append(UI_STRINGS.newRecordToggleHeading);
    div.append(heading);
    ["newRecordsOnly", "allRecords"].forEach((op, idx) => {
      const label = ce("label");
      label.className = "f_14 newRecordLabel";
      const input = ce("input");
      input.type = "radio";
      input.name = NEW_RECORD_RADIO_NAME;
      input.className = NEW_RECORD_RADIO_NAME;
      input.value = op;
      input.checked = idx === 0;
      input.addEventListener("change", onChange);
      label.append(input, UI_STRINGS[op]);
      div.append(label);
    });
    return div;
  }

  function createSortByRadio(onChange) {
    const div = ce("div");
    div.className = "m_b_10 sortByRadioContainer";
    const heading = ce("div");
    heading.className = "t_c m_5";
    heading.append(UI_STRINGS.sortBy);
    div.append(heading);
    ["olderFirst", "newerFirst"].forEach((op, idx) => {
      const label = ce("label");
      label.className = "f_14 sortByLabel";
      const input = ce("input");
      input.type = "radio";
      input.name = SORT_BY_RADIO_NAME;
      input.className = SORT_BY_RADIO_NAME;
      input.value = op;
      input.checked = idx === 0;
      input.addEventListener("change", onChange);
      label.append(input, UI_STRINGS[op]);
      div.append(label);
    });
    return div;
  }
  
  function createCopyButton(onClick) {
    const div = ce("div");
    div.className = "copyBtnContainer";
    
    const btn = ce("button");
    btn.className = "copyBtn";
    btn.append(UI_STRINGS.copy);
    div.append(btn)
    
    const res = ce("span");
    res.className = "f_16 copyResult"
    div.append(res);
    
    btn.addEventListener("click", () => {
      onClick();
      document.execCommand("copy");
      res.innerText = UI_STRINGS.copied;
      setTimeout(() => {
        res.innerText = "";
      }, 5000);
    });
    return div;
  }

  function createOutputElement(records, insertBefore) {
    const playDates = records.reduce((s, r) => {
      s.add(formatDate(r.date).split(" ")[0]);
      return s;
    }, new Set());

    let dv = document.getElementById("recordSummary");
    if (dv) {
      dv.innerHTML = "";
    } else {
      dv = ce("div");
      dv.id = "recordSummary";
    }

    const table = ce("table"), thead = ce("thead"), tbody = ce("tbody");
    table.className = "playRecordTable";
    table.append(thead, tbody);

    const handleOptionChange = () => {
      const options = getFilterAndOptions();
      renderTopScores(records, options, thead, tbody);
    };
    dv.append(createDateOptions(playDates, handleOptionChange));
    dv.append(createNewRecordToggle(handleOptionChange));
    dv.append(createSortByRadio(handleOptionChange));

    const btn = createCopyButton(() => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(tbody);
      selection.removeAllRanges();
      selection.addRange(range);
    });
    dv.append(btn);
    
    renderTopScores(records, {olderFirst: true}, thead, tbody);
    dv.append(table);
    insertBefore.insertAdjacentElement('beforebegin', dv);
    return table;
  }

  const titleImg = document.querySelector(".main_wrapper > img.title");
  if (titleImg) {
    createOutputElement(collectRecentPlays(), titleImg);
    const css = ce("link");
    css.rel = "stylesheet";
    css.href = "https://myjian.github.io/mai-tools/scripts/recent-play-downloader.css";
    document.head.append(css);
  }
})();
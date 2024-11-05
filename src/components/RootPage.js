import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@fullcalendar/core";
import TopBar from "./TopBar"; // 상단바 컴포넌트
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // 상호작용 플러그인 (클릭, 드래그 등)
import { getCookie } from "../utils/utils";
import axios from "axios";

const events = [{ title: "Meeting", start: new Date() }];

const RootPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <TopBar />
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next,today", // 왼쪽에 이전, 다음, 오늘 버튼
          center: "title", // 중앙에 제목(현재 날짜 범위)
          right: "dayGridMonth,timeGridWeek,timeGridDay", // 오른쪽에 월, 주, 일간 보기 전환 버튼
        }}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        initialView="dayGridMonth"
        select={handleDateSelect}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
};

function handleDateSelect(selectInfo) {
  let title = prompt("Please enter a new title for your event");
  let calendarApi = selectInfo.view.calendar;

  console.log(selectInfo.startStr);

  calendarApi.unselect(); // clear date selection

  if (title) {
    calendarApi.addEvent({
      id: 1,
      title: title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
    });
  }

  console.log(calendarApi);
}

// a custom render function
function renderEventContent(eventInfo) {
  console.log(eventInfo);
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

export default RootPage;

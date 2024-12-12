import { useEffect } from "react";

interface TicketField {
  ticket: string; // UUID
}
interface TypeField {
  type: string;
  codes: string[]; // market codes
  is_only_realtime?: boolean;
}
interface FormatField {
  format?: string; // SIMPLE | DEFAULT
}

export type UpbitWsReqForm = [TicketField, TypeField, FormatField?];

export const useUpbitWebSocket = (
  url: string,
  upbitWsReqForm: UpbitWsReqForm,
  onmsgHandler: (event: MessageEvent) => void
) => {
  useEffect(() => {
    connect(url, upbitWsReqForm, onmsgHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const connect = (
  url: string,
  upbitWsReqForm: UpbitWsReqForm,
  onmsgHandler: (event: MessageEvent) => void
) => {
  console.debug("WebSocket connecting ... ", url);
  const socket = new WebSocket(url);
  socket.onerror = (error: Event) => {
    console.error("WebSocket Error:", error);
  };
  socket.onclose = () => {
    console.debug("WebSocket closed.");
    let interval = 10000;
    if(process.env.NEXT_PUBLIC_WEBSOCKET_RECONNECT_INTERVAL){
      interval = parseInt(process.env.NEXT_PUBLIC_WEBSOCKET_RECONNECT_INTERVAL,10)
    }
    else{
      console.debug("NEXT_PUBLIC_WEBSOCKET_RECONNECT_INTERVAL is not set. Use default value 10000ms");
    }
    console.debug("Reconnect after " + interval + "ms ...");
    setTimeout(() => {
      connect(url, upbitWsReqForm, onmsgHandler);
    }, interval);
  };
  socket.onopen = () => {
    console.debug(
      "WebSocket connnection established. send request form.",
      upbitWsReqForm
    );
    socket.send(JSON.stringify(upbitWsReqForm));
  };
  socket.onmessage = onmsgHandler;
};
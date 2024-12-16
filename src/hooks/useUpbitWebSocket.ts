import { DependencyList, useEffect, useState } from "react";

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
  onmsgHandler: (event: MessageEvent) => void,
  deps: DependencyList | undefined
) => {
  const [isLoading, setIsLoading] = useState(false); // Loading 상태 추가

  useEffect(() => {
    const connect = (
      url: string,
      upbitWsReqForm: UpbitWsReqForm,
      onmsgHandler: (event: MessageEvent) => void
    ) => {
      console.debug("WebSocket connecting ... ", url);
      const socket = new WebSocket(url);
      socket.onerror = (error: Event) => {
        console.error("WebSocket Error:", error);

        setIsLoading(true);
        setTimeout(() => {
          console.debug("Retrying WebSocket connection...");
          connect(url, upbitWsReqForm, onmsgHandler); // 2초 후 재연결
        }, 2000);
      };
      socket.onclose = () => {
        console.debug("WebSocket closed.");
      };
      socket.onopen = () => {
        console.debug(
          "WebSocket connnection established. send request form.",
          upbitWsReqForm
        );
        socket.send(JSON.stringify(upbitWsReqForm));
        setIsLoading(false);
      };
      socket.onmessage = onmsgHandler;

      return socket;
    };

    const socket = connect(url, upbitWsReqForm, onmsgHandler);

    return () => {
      socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return isLoading;
};

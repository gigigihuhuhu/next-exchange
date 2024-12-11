"use client";
import { useAuth } from "@/context/auth-context";

export default function AuthButton() {
  const { authenticated, user, keycloak } = useAuth();
  if (authenticated == null) {
    return <p className="w-[250px]"></p>;
  }
  if (authenticated) {
    return (
      <div className="w-[250px] flex flex-row justify-end gap-5">
        <p>{`${user?.name} 님 안녕하세요!`}</p>
        <button onClick={()=>keycloak.logout()}>로그아웃</button>
      </div>
    );
  } else {
    return (
      <div className="w-[250px] flex flex-row gap-5 justify-end">
        <button onClick={()=>keycloak.login()}>로그인</button>
        <button onClick={()=>keycloak.register()}>회원가입</button>
      </div>
    );
  }
}

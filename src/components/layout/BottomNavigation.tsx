// app/tabs/page.tsx
"use client";
import style from "./BottomNavigation.module.css";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <div className={style.wrapper}>
      <Tabs aria-label="Options" selectedKey={pathname} fullWidth>
        <Tab key="calendar" title="カレンダー" href="/calendar" />
        <Tab key="exercise" title="エクササイズ" href="/exercise" />
        <Tab key="profile" title="プロフィール" href="/profile" />
      </Tabs>
    </div>
  );
};

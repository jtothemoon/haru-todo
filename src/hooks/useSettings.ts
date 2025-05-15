"use client";

import { useState, useEffect } from "react";
import {
  getResetTime,
  setResetTime as saveResetTime,
  canChangeResetTime,
  getTimeUntilNextChange,
} from "@/lib/storage";

export const useSettings = () => {
  const [resetTime, setResetTime] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newResetTime, setNewResetTime] = useState("");
  const [canChange, setCanChange] = useState(true);
  const [timeUntilChange, setTimeUntilChange] = useState("");

  useEffect(() => {
    setResetTime(getResetTime());
    setCanChange(canChangeResetTime());
    setTimeUntilChange(getTimeUntilNextChange());
    setIsLoaded(true);
  }, []);

  const handleEditClick = () => {
    setNewResetTime(resetTime);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!canChange) return;

    setResetTime(newResetTime);
    saveResetTime(newResetTime);
    setCanChange(false);
    setTimeUntilChange("24시간 0분 후");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewResetTime("");
  };

  return {
    resetTime,
    isLoaded,
    isEditing,
    newResetTime,
    canChange,
    timeUntilChange,
    setNewResetTime,
    handleEditClick,
    handleSave,
    handleCancel,
  };
};
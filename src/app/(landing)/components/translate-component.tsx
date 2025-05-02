"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useRef, useState } from "react";

// List of supported languages
const languages = [
  { code: "en", name: "English", flag: "🌍" }, // Default language
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "sw", name: "Swahili", flag: "🌍" }, // No specific flag for Swahili
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "zh-CN", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "de", name: "German", flag: "🇩🇪" },
];

const TranslateComponent = () => {
  const googleTranslateRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: languages.map((lang) => lang.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = googleTranslateElementInit;
    addGoogleTranslateScript();
  }, []);

  // Change language dynamically
  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    setTimeout(() => {
      const selectElement = document.querySelector(
        ".goog-te-combo",
      ) as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event("change"));
      }
    }, 500); // Delay to ensure Google Translate widget is loaded
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Custom Dropdown for Language Selection */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {languages.find((lang) => lang.code === selectedLanguage)?.flag}{" "}
            {selectedLanguage.toUpperCase()}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Hidden Google Translate Element */}
      <div
        id="google_translate_element"
        className="hidden"
        ref={googleTranslateRef}
      ></div>
    </div>
  );
};

export default TranslateComponent;

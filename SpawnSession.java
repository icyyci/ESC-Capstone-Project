package com.example.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SpawnSession {
    public static void main(String[] args) throws InterruptedException {

        for(int x=0;x<10;x++) {
            System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

            WebDriver driver = new ChromeDriver();

            driver.get("https://evening-eyrie-66460.herokuapp.com/");
            Thread.sleep(1000);
            driver.quit();

        }

    }
}
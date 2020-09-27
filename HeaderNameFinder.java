package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class HeaderNameFinder {
    public static void main(String[] args) {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://sudiptac.bitbucket.io");
        //driver.get("https://istd.sutd.edu.sg/");
        //driver.get("https://www.google.com.sg");

        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        for(int i = 1; i < links.size(); i++) {
            if(driver.getTitle().equals("")){
                System.out.println("Empty title");
            }
        }
    }
}

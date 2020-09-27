package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class FillLogin {
    static String myUserName = "escistd50.003";
    static String myPassword = "SUTD@Singapore";

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver","C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://statcounter.com/login/");

        // get the user name field of the account page
        WebElement username = driver.findElement(By.id("username"));

        Thread.sleep(3000);

        // send my user name to fill up the box
        username.sendKeys(myUserName);

        Thread.sleep(3000);

        // locate the "Next" button in the account page
        WebElement password = driver.findElement(By.id("password"));

        //write password
        password.sendKeys(myPassword);

        Thread.sleep(3000);

        // login and :)
        WebElement nextButton = driver.findElement(By.className("submit"));
        nextButton.click();

        Thread.sleep(3000);

        //click project name
        WebElement project = driver.findElement(By.id("project-name-p12207705"));
        project.click();

    }
}

package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AdminAnnouncement {
    static String[] myUserName = new String[]{"admin"};
    static String[] myPassword = new String[]{"password"};
    static String grouppassword;

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://evening-eyrie-66460.herokuapp.com/");


        for (int i = 0; i < myPassword.length; i++) {
            // get the user name field of the account page
            WebElement username = driver.findElement(By.name("userID"));

            // locate the "Next" button in the account page
            WebElement password = driver.findElement(By.name("password"));

            //clear the inputs first before reentering the value
            username.clear();
            password.clear();

            // send my user name to fill up the box
            username.sendKeys(myUserName[i]);
            //write password
            password.sendKeys(myPassword[i]);

            // login and :)
            WebElement nextButton = driver.findElement(By.className("loginButton"));
            nextButton.click();

            //send private announcement to Group 20
            WebElement tab = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/div/button"));
            tab.click();
            Thread.sleep(3000);
            tab.click();
            tab.click();
            WebElement group20 = driver.findElement(By.cssSelector("#root > div > div.MuiDrawer-root.MuiDrawer-docked.jss3 > div > ul:nth-child(2) > div:nth-child(6)"));
            group20.click();
            WebElement privatebutton = driver.findElement(By.cssSelector("#root > div > div.MuiContainer-root.MuiContainer-maxWidthSm > div.MuiTypography-root.MuiTypography-body1 > p > div > div:nth-child(1) > button"));
            privatebutton.click();
            WebElement privatemessage = driver.findElement(By.id("name"));
            privatemessage.sendKeys("Hi Group 20! How's life?");
            WebElement primessagebutton = driver.findElement(By.xpath("/html/body/div[2]/div[3]/div/div[3]/button[2]"));
            Thread.sleep(3000);
            primessagebutton.click();

            //send global announcement to every group
            tab = driver.findElement(By.xpath("//*[@id=\"root\"]/div/header/div/button"));
            tab.click();
            WebElement publicbutton = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/ul[5]/div"));
            publicbutton.click();
            WebElement publicmessage = driver.findElement(By.id("name"));
            publicmessage.sendKeys("Hi everybody! how's life?");
            WebElement publicannouncebutton = driver.findElement(By.cssSelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogActions-root.MuiDialogActions-spacing > button:nth-child(2)"));
            Thread.sleep(5000);
            publicannouncebutton.click();

            //go out and login as Group 20
            driver.navigate().back();
            username = driver.findElement(By.name("userID"));
            password = driver.findElement(By.name("password"));
            username.clear();
            password.clear();

            // send my user name to fill up the box
            username.sendKeys("group20");
            //write password
            password.sendKeys("hello1234");

            // login and :)
            nextButton = driver.findElement(By.className("loginButton"));
            nextButton.click();
            //go into announcement tab to check for the announcement posted
            WebElement announcement = driver.findElement(By.xpath("//*[@id=\"navigation-pills\"]/div[3]/div/div/div[1]/div/div/div/button[2]"));
            announcement.click();
            Thread.sleep(10000);

        }
        //driver.quit();
    }
}
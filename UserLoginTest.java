package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class UserLoginTest {
    static String[] myUserName = new String[] {"group20","group12","group24"};
    static String[] myPassword = new String[] {"hello1234","hello","hello"};

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://evening-eyrie-66460.herokuapp.com/");


        for(int i=0;i<myPassword.length;i++) {
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

            //check access for user login
            if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/user")){
                System.out.println("Login Successful: "+myUserName[i]);
                driver.get("https://evening-eyrie-66460.herokuapp.com/chat");
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/chat")) {
                    System.out.println("User Chat is accessed");
                }
                else{
                    System.out.println("User cannot enter chat");
                }
                Thread.sleep(3000);
                driver.navigate().back();
                driver.get("https://evening-eyrie-66460.herokuapp.com/user/request");
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/user/request")){
                    System.out.println("User Request is accessed");
                }
                else{
                    System.out.println("User cannot go to Request");
                }
                Thread.sleep(3000);
                driver.navigate().back();
                driver.get("https://evening-eyrie-66460.herokuapp.com/admin");
                Thread.sleep(1000);
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin")){
                    System.out.println("Illegal access by user to admin page, DANGER!");
                }
                else{
                    System.out.println("Admin page is not breached by user");
                }
                Thread.sleep(3000);
                driver.navigate().back();
                driver.get("https://evening-eyrie-66460.herokuapp.com/admin/registergroup");
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin/registergroup")){
                    System.out.println("Illegal access by user to admin register group, DANGER!");
                }
                else{
                    System.out.println("Admin register group page is not breached by user");
                }
                driver.navigate().back();
                driver.get("https://evening-eyrie-66460.herokuapp.com/chat/?chat="+myUserName[i]);
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin/registergroup")){
                    System.out.println("Illegal access by user to admin chat, DANGER!");
                }
                else{
                    System.out.println("Admin chat is not breached by user");
                }
                driver.navigate().back();
                driver.navigate().back();
            }
        }
    }
}
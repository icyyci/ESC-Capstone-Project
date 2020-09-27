package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AdminLoginTest {
    static String[] myUserName = new String[] {"admin"};
    static String[] myPassword = new String[] {"password"};
    static String[] users = new String[] {"group20","group12","group24"};

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

            //check access for admin login
            if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin")){
                System.out.println("Login Successful: Admin");
                for(int j=0;j<users.length;j++) {
                    driver.get("https://evening-eyrie-66460.herokuapp.com/chat/?chat=" +users[j]);
                    if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/chat/?chat=" +users[j])){
                        System.out.println("Admin successfully enter chat with "+users[j]);
                    }
                    else{
                        System.out.println("Admin cannot successfully enter chat with "+users[j]);
                    }
                    driver.navigate().back();
                }
                driver.get("https://evening-eyrie-66460.herokuapp.com/admin/registergroup");
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin/registergroup")){
                    System.out.println("Admin can register groups");
                }
                else{
                    System.out.println("Registering of Groups is not available for the admin");
                }
                driver.navigate().back();
                driver.navigate().back();
            }
        }
        driver.quit();
    }
}
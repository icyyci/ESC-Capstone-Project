package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
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
                System.out.println("Login Successful: " + myUserName[i]);
                // get all the links
                java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
                //attempt to get into the links from the website
                for(int j = 0; j < links.size(); j++) {
                    //System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
                    if (links.get(j).getAttribute("href") == null ||
                            links.get(j).getAttribute("href").equals("https://sudiptac.bitbucket.io/"))
                        //if (links.get(i).getAttribute("href") == null)
                        continue;
                    boolean staleElementLoaded = true;
                    //the loop checks whether the elements is properly loaded
                    while(staleElementLoaded) {
                        try {
                            //navigate to the link
                            driver.navigate().to(links.get(j).getAttribute("href"));
                            Thread.sleep(3000);
                            //click the back button in browser
                            driver.navigate().back();
                            if(!driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/user")){
                                driver.navigate().back();
                            }
                            Thread.sleep(3000);
                            links = driver.findElements(By.tagName("a"));
                            System.out.println("*** Navigated to" + " " + links.get(j).getAttribute("href"));
                            staleElementLoaded = false;
                        } catch (StaleElementReferenceException e) {
                            staleElementLoaded = true;
                        }
                    }
                }
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
        driver.quit();
    }
}
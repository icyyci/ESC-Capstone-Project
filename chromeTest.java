package com.example.selenium;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class chromeTest {

    @Test
    public void LaunchChrome_Method1() {
        System.setProperty("webdriver.chrome.driver","C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        // open my webpage
        driver.get("https://sudiptac.bitbucket.io/");

        // click the link with name "press release"
        driver.findElement(By.linkText("ASSET Research Group")).click();

        // click the link name "Event"
        driver.findElement(By.linkText("Sakshi Udeshi")).click();

        // click the link name "Publications"
        driver.findElement(By.linkText("Publications")).click();
    }

    @Test
    public void findallLinks(){
        System.setProperty("webdriver.chrome.driver","C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        // open my webpage
        driver.get("https://sudiptac.bitbucket.io/");
        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println(links.size());

        System.out.println("***Printing all link names***");
        // print all the links
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
        }
        System.out.println("***Printing all link addresses***");
        // print all the hyper links
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }
    }
    @Test
    public void findandClick() throws InterruptedException{
        System.setProperty("webdriver.chrome.driver","C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://sudiptac.bitbucket.io");
        //driver.get("https://istd.sutd.edu.sg/");
        //driver.get("https://www.google.com.sg");

        // get all the links
        java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
        System.out.println("It has "+links.size()+" links");

        // print all the links
        for (int i = 0; i < links.size(); i=i+1) {
            System.out.println(i + " " + links.get(i).getText());
            System.out.println(i + " " + links.get(i).getAttribute("href"));
        }

        // maximize the browser window
        driver.manage().window().maximize();

        // click all links in a web page
        for(int i = 1; i < links.size(); i++)
        {
            System.out.println("*** Navigating to" + " " + links.get(i).getAttribute("href"));
            if (links.get(i).getAttribute("href") == null ||
            		links.get(i).getAttribute("href").equals("https://sudiptac.bitbucket.io/"))
            //if (links.get(i).getAttribute("href") == null)
                continue;
            boolean staleElementLoaded = true;
            //the loop checks whether the elements is properly loaded
            while(staleElementLoaded) {
                try {
                    //navigate to the link
                    driver.navigate().to(links.get(i).getAttribute("href"));
                    Thread.sleep(3000);
                    //click the back button in browser
                    driver.navigate().back();
                    if(!driver.getCurrentUrl().equals("https://sudiptac.bitbucket.io/")){
                        driver.navigate().back();
                    }
                    Thread.sleep(3000);
                    links = driver.findElements(By.tagName("a"));
                    System.out.println("*** Navigated to" + " " + links.get(i).getAttribute("href"));
                    staleElementLoaded = false;
                } catch (StaleElementReferenceException e) {
                    staleElementLoaded = true;
                }
            }
        }
    }
}

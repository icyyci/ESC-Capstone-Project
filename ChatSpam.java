package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Random;

public class ChatSpam {
    static String[] myUserName = new String[]{"group20"};
    static String[] myPassword = new String[]{"hello1234"};
    static ArrayList<String> message = new ArrayList<>();
    static ArrayList<WebElement> latestrequest = new ArrayList<>();

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://evening-eyrie-66460.herokuapp.com/");


        for (int i = 0; i < 1; i++) {
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
            if (driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/user")) {
                System.out.println("Login Successful: " + myUserName[i]);
                // get all the links
                java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
                //attempt to get into the request page
                driver.navigate().to(links.get(1).getAttribute("href"));
                Thread.sleep(3000);
                WebElement sendtext = driver.findElement(By.id("m"));
                WebElement send = driver.findElement(By.tagName("button"));
                for(int j=0;j<30;j++){
                    message.add(createFuzzer());
                    sendtext.sendKeys(message.get(j));
                    send.click();
                }


            }
        }
        driver.quit();
    }

    private static String createFuzzer() {
        StringBuilder input = new StringBuilder();
        Random RANDOM = new Random(1);

        // strings of any length between 8 and 16
        RANDOM.setSeed(System.currentTimeMillis());
        int stringLength = 8 + (RANDOM.nextInt() & Integer.MAX_VALUE) % 8;
        System.out.println(stringLength + "\n");

        //generate a random character at each location of the string
        for (int index = 0; index < stringLength; index++) {
            double between0And1 = (double) (RANDOM.nextInt() & Integer.MAX_VALUE) / (double) Integer.MAX_VALUE;
            //generate a character between ASCII 32 and 128
            input.append((char) (between0And1 * 96 + 32));
        }
        // here is the input string to fuzz
        System.out.println(input);
        String output = input.toString();
        return output;
    }
}
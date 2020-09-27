package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Random;

public class LoginBotWithInvalidValidUser {
    static ArrayList<String> myUserName= new ArrayList<>();
    static ArrayList<String> myPassword= new ArrayList<>();
    static String MyUserName = "escistd50.003";
    static String MyPassword = "SUTD@Singapore";
    public final static Random RANDOM = new Random(1);

    public static String flip(String input) {
        int flipPosition;

        RANDOM.setSeed(System.currentTimeMillis());
        // choose a random position in the input string
        flipPosition = Integer.remainderUnsigned(RANDOM.nextInt() & Integer.MAX_VALUE, input.length() - 1);

        double between0And1 = (double)(RANDOM.nextInt() & Integer.MAX_VALUE) / (double)Integer.MAX_VALUE;

        // flip the bit in-place
        //input = input.replace(input.charAt(flipPosition), (char)(between0And1 * 96 + 32));
        char[] string = input.toCharArray();
        System.out.println(string);
        string[flipPosition] = (char)(between0And1 * 96 + 32);
        String changed = new String(string);
        System.out.println(changed);

        return changed;
    }

    public static void main(String[] args) throws InterruptedException {

        myUserName.add("escistd50.003");
        myPassword.add("SUTD@Singapore");
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();

        driver.get("https://statcounter.com/login/");
        for(int i=0;i<10;i++){
            myUserName.add(flip(myUserName.get(i)));
            myPassword.add(flip(myPassword.get(i)));
            Thread.sleep(100);
        }
        myUserName.remove(0);
        myPassword.remove(0);
        myUserName.add(MyUserName);
        myPassword.add(MyPassword);

        System.out.println(myUserName);
        System.out.println(myPassword);

        for(int i=0;i<myUserName.size();i++) {
        // get the user name field of the account page
        WebElement username = driver.findElement(By.id("username"));
        username.clear();
        // send my user name to fill up the box
        username.sendKeys(myUserName.get(i));

        // locate the "Next" button in the account page
        WebElement password = driver.findElement(By.id("password"));
        password.clear();
        //write password
        password.sendKeys(myPassword.get(i));

        // login and :)
        WebElement nextButton = driver.findElement(By.className("submit"));
        nextButton.click();

        Thread.sleep(3000);
        }

    }
}
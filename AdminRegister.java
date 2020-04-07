package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.Random;

public class AdminRegister {
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

            //check access for admin login
            if (driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin")) {
                System.out.println("Login Successful: Admin");
                WebElement registergroup = driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[1]/div/ul[3]/div"));
                registergroup.click();

                java.util.List<WebElement> registerinput = driver.findElements(By.tagName("input"));
                WebElement button = driver.findElement(By.tagName("button"));
                registerinput.get(0).sendKeys(createFuzzer());
                button.click();
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin/registergroup")){
                    System.out.println("Not all fields are filled, correct flow");
                }
                registerinput.get(0).clear();

                for(int j=0;j<registerinput.size();j++){
                    registerinput.get(j).sendKeys(createFuzzer());
                }
                button.click();
                if(driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/admin/registergroup")){
                    System.out.println("password do not match, correct flow");
                }
                for(int j=0;j<registerinput.size();j++){
                    registerinput.get(j).clear();
                }
                for(int j=0;j<registerinput.size()-1;j++) {
                    if (j == 2) {
                        grouppassword = createFuzzer();
                        registerinput.get(j).sendKeys(grouppassword);
                    } else {
                        registerinput.get(j).sendKeys(createFuzzer());
                    }
                }
                registerinput.get(registerinput.size()-1).sendKeys(grouppassword);
                driver.navigate().to("https://evening-eyrie-66460.herokuapp.com/admin");


            }
        }
        driver.quit();
    }
    private static String createFuzzer(){
        StringBuilder input = new StringBuilder();
        Random RANDOM = new Random(1);

        // strings of any length between 8 and 16
        RANDOM.setSeed(System.currentTimeMillis());
        int stringLength = 8+(RANDOM.nextInt() & Integer.MAX_VALUE) % 8;
        System.out.println(stringLength+"\n");

        //generate a random character at each location of the string
        for(int index = 0; index < stringLength; index++) {
            double between0And1 = (double)(RANDOM.nextInt() & Integer.MAX_VALUE) / (double)Integer.MAX_VALUE;
            //generate a character between ASCII 32 and 128
            input.append((char)(between0And1 * 96 + 32));
        }
        // here is the input string to fuzz
        System.out.println(input);
        String output = input.toString();
        return output;
    }
}
package com.example.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.ArrayList;
import java.util.Random;

public class MultiUserRequests extends Thread {
    static String[] myUserName = new String[]{"group12","group20","group2"};
    static String[] myPassword = new String[]{"hello","hello1234","hello"};
    static ArrayList<String> request = new ArrayList<>();
    static ArrayList<WebElement> latestrequest = new ArrayList<>();
    static String Username;
    static String Password;

    MultiUserRequests(String username, String password){
        Username=username;
        Password=password;
    }
    public void run(){
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\moodl\\Downloads\\chromedriver_win32\\chromedriver.exe");

        WebDriver driver = new ChromeDriver();
        try {



            driver.get("https://evening-eyrie-66460.herokuapp.com/");

            Thread.sleep(3000);

            // get the user name field of the account page
            WebElement username = driver.findElement(By.name("userID"));

            // locate the "Next" button in the account page
            WebElement password = driver.findElement(By.name("password"));

            //clear the inputs first before reentering the value
            username.clear();
            password.clear();

            // send my user name to fill up the box
            username.sendKeys(Username);
            //write password
            password.sendKeys(Password);

            // login and :)
            WebElement nextButton = driver.findElement(By.className("loginButton"));
            nextButton.click();

            //check access for user login
            if (driver.getCurrentUrl().equals("https://evening-eyrie-66460.herokuapp.com/user")) {
                System.out.println("Login Successful: " + Username);
                // get all the links
                java.util.List<WebElement> links = driver.findElements(By.tagName("a"));
                //attempt to get into the request page
                driver.navigate().to(links.get(0).getAttribute("href"));
                Thread.sleep(3000);
                // get all the inputs
                java.util.List<WebElement> requestbox = driver.findElements(By.tagName("input"));
                for (int j = 0; j < requestbox.size(); j++) {
                    request.add(createFuzzer());
                    requestbox.get(j).sendKeys(request.get(j));
                }
                WebElement proceed = driver.findElement(By.cssSelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > button"));
                proceed.click();
                WebElement proceed2 = driver.findElement(By.cssSelector("body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > button:nth-child(4)"));
                proceed2.click();
                WebElement proceed3 = driver.findElement((By.cssSelector("#root > div > div > button")));
                proceed3.click();
                Thread.sleep(3000);
                for (int a = 1; a < 7; a++) {
                    latestrequest.add(driver.findElement(By.xpath("//*[@id=\"navigation-pills\"]/div[3]/div/div/div[2]/div/div/div/div[3]/div/span/div/table/tbody/tr[" + a + "]/td")));
                }                                                //////*[@id="navigation-pills"]/div[3]/div/div/div[2]/div/div/div/div[3]/div/span/div/table/tbody/tr[1]/td
                for (int k = 0; k < latestrequest.size(); k++) {
                    String finale = latestrequest.get(k).getAttribute("innerHTML").replace("amp;", "");
                    if (finale.equals(request.get(k))) {
                        System.out.println("Request " + k + " is correctly recorded");
                    } else {
                        System.out.println(request.get(k));
                        System.out.println(finale);
                        System.out.println("Request " + k + " is incorrectly recorded");
                    }
                }
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        driver.quit();
    }
    public static void main(String[] args) throws InterruptedException {
        for(int i=0;i<myUserName.length;i++){
            new Thread(new MultiUserRequests(myUserName[i],myPassword[i])).start();
        }
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
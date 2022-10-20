package com.walletBankingApp.walletbankingapp.controller;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.Credentials;
import com.walletBankingApp.walletbankingapp.entity.UserEntity;
import com.walletBankingApp.walletbankingapp.entity.Wallet;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.BankService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class BankControllerTest {

    @Mock
    private BankService bankService;

    @InjectMocks
    private BankController bankController;

    private UserEntity userEntity;

    @BeforeEach
    void setUp(){
        userEntity = UserEntity.builder()
                .firstName("Annu")
                .lastName("Singh")
                .email("annu@gmail.com")
                .password("1234").
                amount(2000).build();
    }

    @Test
    @DisplayName("Should Signup")
    void signupTest() throws BankServiceException {
        Mockito.when(bankService.signup(any(UserEntity.class))).thenReturn("Account created successfully...!!");

        String res = bankController.signup(userEntity);
        Assertions.assertEquals("Account created successfully...!!", res);
        Mockito.verify(bankService, Mockito.times(1)).signup(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should throw exception while signup")
    void signupTestException() throws BankServiceException {
        Mockito.when(bankService.signup(any(UserEntity.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.signup(userEntity));
        Assertions.assertEquals("Error in Signup", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).signup(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should Signin")
    public void signinTest() throws BankServiceException {
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("1234").build();

        Mockito.when(bankService.signin(any(Credentials.class))).thenReturn("Signed in Successfully...!!");
        String res = bankController.signin(credentials);
        Assertions.assertEquals("Signed in Successfully...!!", res);
        Mockito.verify(bankService, Mockito.times(1)).signin(any(Credentials.class));
    }

    @Test
    @DisplayName("Should throw exception while signin")
    public void signinTestException() throws BankServiceException {
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("1234").build();
        Mockito.when(bankService.signin(any(Credentials.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.signin(credentials));
        Assertions.assertEquals("Error in signin", exception.getMessage());
    }

    @Test
    @DisplayName("Should fetch all the users")
    public void getUsersTest() throws BankServiceException {
        Mockito.when(bankService.getUsers()).thenReturn(List.of(userEntity));
        List<UserEntity> result = bankController.getUsers();
        Assertions.assertEquals(List.of(userEntity), result);
        Mockito.verify(bankService, Mockito.times(1)).getUsers();
    }

    @Test
    @DisplayName("Should throw error in fetching users")
    public void getUsersTestException() throws BankServiceException {
        Mockito.when(bankService.getUsers()).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.getUsers());
        Assertions.assertEquals("Error in getting users", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).getUsers();
    }

    @Test
    @DisplayName("Should recharge wallet")
    public void walletRechargeTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(1000).build();
        Mockito.when(bankService.walletRecharge(any(Wallet.class))).thenReturn("Amount Credited Successfully...!!");
        String result = bankController.walletRecharge(wallet);
        Assertions.assertEquals("Amount Credited Successfully...!!", result);
        Mockito.verify(bankService, Mockito.times(1)).walletRecharge(any(Wallet.class));
    }

    @Test
    @DisplayName("Should throw error in recharge")
    public void walletRechargeTestException() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(1000).build();
        Mockito.when(bankService.walletRecharge(any(Wallet.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.walletRecharge(wallet));
        Assertions.assertEquals("Error in recharge", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).walletRecharge(any(Wallet.class));
    }

    @Test
    @DisplayName("Should transfer amount")
    public void transferAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(1000).creditToEmail("abcd2468").build();
        Mockito.when(bankService.transferAmount(any(Wallet.class))).thenReturn("Amount Transferred Successfully...!!");
        String result = bankController.transferAmount(wallet);
        Assertions.assertEquals("Amount Transferred Successfully...!!", result);
        Mockito.verify(bankService, Mockito.times(1)).transferAmount(any(Wallet.class));
    }

    @Test
    @DisplayName("Should throw error while transferring amount")
    public void transferAmountTestException() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("abcd1234").amount(1000).creditToEmail("abcd2468").build();
        Mockito.when(bankService.transferAmount(any(Wallet.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.transferAmount(wallet));
        Assertions.assertEquals("Error in transferring the amount", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).transferAmount(any(Wallet.class));
    }

    @Test
    @DisplayName("Should get user details")
    public void getUserDetailsTest() throws BankServiceException {
        Mockito.when(bankService.getUserDetails(any(String.class))).thenReturn(userEntity);

        UserEntity result = bankController.getUserDetails("annus@gmail.com");
        Assertions.assertEquals(userEntity, result);
        Mockito.verify(bankService, Mockito.times(1)).getUserDetails(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in getting user details")
    public void getUserDetailsTestException() throws BankServiceException {
        Mockito.when(bankService.getUserDetails(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.getUserDetails("annu@gmail.com"));
        Assertions.assertEquals("Error in getting user details", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).getUserDetails(any(String.class));
    }

    @Test
    @DisplayName("Should get balance from email")
    public void getBalanceTest() throws BankServiceException {
        Mockito.when(bankService.getAmountByEmail(any(String.class))).thenReturn(1000.0);
        double result = bankController.getAmount("annus@gmail.com");
        Assertions.assertEquals(1000.0, result);
        Mockito.verify(bankService, Mockito.times(1)).getAmountByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in getting balance")
    public void getBalanceTestException() throws BankServiceException {
        Mockito.when(bankService.getAmountByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankController.getAmount("annu@gmail.com"));
        Assertions.assertEquals("Error in getting amount", exception.getMessage());
        Mockito.verify(bankService, Mockito.times(1)).getAmountByEmail(any(String.class));
    }
}

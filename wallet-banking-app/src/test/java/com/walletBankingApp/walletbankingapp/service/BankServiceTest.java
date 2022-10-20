package com.walletBankingApp.walletbankingapp.service;

import com.mongodb.MongoSocketException;
import com.walletBankingApp.walletbankingapp.entity.*;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.BankRepository;
import com.walletBankingApp.walletbankingapp.repository.CashbackRepository;
import com.walletBankingApp.walletbankingapp.repository.TransactionRepository;
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
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
public class BankServiceTest {

    @Mock
    private BankRepository bankRepository;

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CashbackRepository cashbackRepository;

    @InjectMocks
    private BankService bankService;

    private UserEntity userEntity;

    @BeforeEach
    void setUp(){
        userEntity = UserEntity.builder()
                .firstName("Annu")
                .lastName("Singh")
                .email("annu@gmail.com")
                .password("03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4")
                .amount(2000).build();
    }

    @Test
    @DisplayName("Should Signup")
    public void signupTest() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());
        Mockito.when(bankRepository.save(any(UserEntity.class))).thenReturn(userEntity);
        String result = bankService.signup(userEntity);
        Assertions.assertEquals("Account created successfully...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).save(any(UserEntity.class));
    }

    @Test
    public void emailAlreadyExistSignupTest() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        String result = bankService.signup(userEntity);
        Assertions.assertEquals("Email already exists...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in signup")
    public void signupTestException(){
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.signup(userEntity));
        Assertions.assertEquals("Error in signup", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should Signin")
    public void signinTest() throws BankServiceException {
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("1234").build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        String result = bankService.signin(credentials);
        Assertions.assertEquals("Signed in Successfully...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    public void accountDoesNotExistsSigninTest() throws BankServiceException {
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("1234").build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());
        String result = bankService.signin(credentials);
        Assertions.assertEquals("Account does not exists with this email...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    public void incorrectPasswordSigninTest() throws BankServiceException {
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("5678").build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        String result = bankService.signin(credentials);
        Assertions.assertEquals("Incorrect Password...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in signin")
    public void signinTestException(){
        Credentials credentials = Credentials.builder().email("annu@gmail.com").password("5678").build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.signin(credentials));
        Assertions.assertEquals("Error in signin", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should give invalid amount")
    public void walletRechargeInvalidAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(0).build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        String result = bankService.walletRecharge(wallet);
        Assertions.assertEquals("Enter a valid amount", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));

    }

    @Test
    @DisplayName("Should recharge wallet")
    public void walletRechargeTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(1000).build();
        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("HDFC Bank").to_name("Annu Singh")
                .type("Debit").transferAmount(1000).amount(2000).
                 build();

        CashbackEntity cashback = CashbackEntity.builder().
                email("annu@gmail.com").
                cashback_amount(100).
                prev_amount(1000).
                current_amount(1100).build();

        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        Mockito.when(bankRepository.save(any(UserEntity.class))).thenReturn(userEntity);
        Mockito.when(transactionRepository.save(any(TransactionEntity.class))).thenReturn(transaction);
        Mockito.when(cashbackRepository.save(any(CashbackEntity.class))).thenReturn(cashback);
        String result = bankService.walletRecharge(wallet);
        Assertions.assertEquals("Amount Credited Successfully...!!", result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
        Mockito.verify(bankRepository, Mockito.times(2)).save(any(UserEntity.class));
    }

    @Test
    @DisplayName("Should throw error in recharge")
    public void walletRechargeTestException(){
        Wallet wallet = Wallet.builder().email("annu@gmail.com").amount(1000).build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.walletRecharge(wallet));
        Assertions.assertEquals("Error in recharge", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should display user does not exists")
    public void userNotPresentTransferAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").creditToEmail("random@gmail.com").amount(3000).build();
        UserEntity randomUserEntity = UserEntity.builder()
                .firstName("Random")
                .lastName("Person")
                .email("random@gmail.com")
                .password("1234").
                amount(2000).build();

        Mockito.when(bankRepository.findByEmail("annu@gmail.com")).thenReturn(Optional.of(userEntity));
        Mockito.when(bankRepository.findByEmail("random@gmail.com")).thenReturn(Optional.empty());
        String res = bankService.transferAmount(wallet);
        Assertions.assertEquals("User does not exist", res);
    }

    @Test
    @DisplayName("Should display invalid amount")
    public void invalidAmountTransferAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").creditToEmail("random@gmail.com").amount(0).build();
        UserEntity randomUserEntity = UserEntity.builder()
                .firstName("Random")
                .lastName("Person")
                .email("random@gmail.com")
                .password("1234").
                amount(2000).build();

        Mockito.when(bankRepository.findByEmail("annu@gmail.com")).thenReturn(Optional.of(userEntity));
        Mockito.when(bankRepository.findByEmail("random@gmail.com")).thenReturn(Optional.of(randomUserEntity));
        String res = bankService.transferAmount(wallet);
        Assertions.assertEquals("Enter a valid amount", res);
    }

    @Test
    @DisplayName("Should display insufficient amount cannot transfer")
    public void insufficientTransferAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").creditToEmail("random@gmail.com").amount(3000).build();
        UserEntity randomUserEntity = UserEntity.builder()
                .firstName("Random")
                .lastName("Person")
                .email("random@gmail.com")
                .password("1234").
                amount(2000).build();

        Mockito.when(bankRepository.findByEmail("annu@gmail.com")).thenReturn(Optional.of(userEntity));
        Mockito.when(bankRepository.findByEmail("random@gmail.com")).thenReturn(Optional.of(randomUserEntity));
        String res = bankService.transferAmount(wallet);
        Assertions.assertEquals("Insufficient Amount", res);
    }

    @Test
    @DisplayName("Should transfer amount")
    public void transferAmountTest() throws BankServiceException {
        Wallet wallet = Wallet.builder().email("annu@gmail.com").creditToEmail("random@gmail.com").amount(1000).build();
        UserEntity randomUserEntity = UserEntity.builder()
                .firstName("Random")
                .lastName("Person")
                .email("random@gmail.com")
                .password("1234").
                amount(2000).build();

        TransactionEntity transaction = TransactionEntity.builder().
                email("annu@gmail.com")
                .from_name("HDFC Bank").to_name("Annu Singh")
                .type("Debit").transferAmount(1000).amount(2000).
                build();

        Mockito.when(bankRepository.findByEmail("annu@gmail.com")).thenReturn(Optional.of(userEntity));
        Mockito.when(bankRepository.findByEmail("random@gmail.com")).thenReturn(Optional.of(randomUserEntity));
        Mockito.when(bankRepository.save(userEntity)).thenReturn(userEntity);
        Mockito.when(bankRepository.save(randomUserEntity)).thenReturn(randomUserEntity);
        Mockito.when(transactionRepository.save(any(TransactionEntity.class))).thenReturn(transaction);
        String res = bankService.transferAmount(wallet);
        Assertions.assertEquals("Amount Transferred Successfully...!!", res);
    }

    @Test
    @DisplayName("Should throw error in transfer amount")
    public void transferAmountTestException(){
        Wallet wallet = Wallet.builder().email("annu@gmail.com").creditToEmail("random@gmail.com").amount(3000).build();
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.transferAmount(wallet));
        Assertions.assertEquals("Error in amount transfer", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should get all the users")
    public void getUsersTest() throws BankServiceException {
        Mockito.when(bankRepository.findAll()).thenReturn(List.of(userEntity));
        List<UserEntity> result = bankService.getUsers();
        Assertions.assertEquals(List.of(userEntity), result);
        Mockito.verify(bankRepository, Mockito.times(1)).findAll();
    }

    @Test
    @DisplayName("should throw Error in getting users")
    public void getUsersTestException(){
        Mockito.when(bankRepository.findAll()).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.getUsers());
        Assertions.assertEquals("Error in getting users", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findAll();
    }

    @Test
    @DisplayName("Should get all the details of user")
    public void getUserDetailsTest() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        UserEntity result = bankService.getUserDetails("annu@gmail.com");
        Assertions.assertEquals(userEntity, result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should get null is user is not present")
    public void userNotPresentDetailsTest() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.empty());
        UserEntity result = bankService.getUserDetails("annu@gmail.com");
        Assertions.assertNotEquals(userEntity, result);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in getting user details")
    public void getUserDetailsTestException(){
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception exception = Assertions.assertThrows(BankServiceException.class, () -> bankService.getUserDetails("annu@gmail.com"));
        Assertions.assertEquals("Error in getting user details", exception.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should get amount")
    public void getAmountByEmailTest() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenReturn(Optional.of(userEntity));
        double res = bankService.getAmountByEmail("annu@gmail.com");
        Assertions.assertEquals(2000, res);
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }

    @Test
    @DisplayName("Should throw error in getting amount")
    public void getAmountByEmailTestException() throws BankServiceException {
        Mockito.when(bankRepository.findByEmail(any(String.class))).thenThrow(MongoSocketException.class);
        Exception ex = Assertions.assertThrows(BankServiceException.class, () -> bankService.getAmountByEmail("annu@gmail.com"));
        Assertions.assertEquals("Error in getting amount", ex.getMessage());
        Mockito.verify(bankRepository, Mockito.times(1)).findByEmail(any(String.class));
    }
}

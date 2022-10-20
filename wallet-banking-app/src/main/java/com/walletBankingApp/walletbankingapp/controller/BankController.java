package com.walletBankingApp.walletbankingapp.controller;

import com.walletBankingApp.walletbankingapp.entity.Credentials;
import com.walletBankingApp.walletbankingapp.entity.Wallet;
import com.walletBankingApp.walletbankingapp.entity.UserEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.BankService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class BankController {

    @Autowired
    private BankService bankService;

    @PostMapping(value = "/signup")
    public String signup(@RequestBody UserEntity userEntity) throws BankServiceException {
        try {
            return bankService.signup(userEntity);
        }catch(Exception e){
            throw new BankServiceException("Error in Signup", e);
        }
    }

    @PostMapping(value = "/signin")
    public String signin(@RequestBody Credentials credentials) throws BankServiceException {
        try {
            return bankService.signin(credentials);
        }catch (Exception e){
            throw new BankServiceException("Error in signin", e);
        }
    }

    @GetMapping(value = "/getUsers")
    public List<UserEntity> getUsers() throws BankServiceException {
        try {
            return bankService.getUsers();
        }catch (Exception e){
            throw new BankServiceException("Error in getting users", e);
        }
    }

    @PostMapping(value = "/recharge")
    public String walletRecharge(@RequestBody Wallet wallet) throws BankServiceException {
        try {
            return bankService.walletRecharge(wallet);
        }catch (Exception e){
            throw new BankServiceException("Error in recharge", e);
        }
    }

    @PostMapping(value = "/transfer/amount")
    public String transferAmount(@RequestBody Wallet wallet) throws BankServiceException {
        try {
            return bankService.transferAmount(wallet);
        }catch (Exception e){
            throw new BankServiceException("Error in transferring the amount", e);
        }
    }

    @GetMapping(value = "/getUserDetails/{email}")
    public UserEntity getUserDetails(@PathVariable String email) throws BankServiceException {
        try {
            return bankService.getUserDetails(email);
        }catch (Exception e){
            throw new BankServiceException("Error in getting user details", e);
        }
    }

    @GetMapping(value = "/getBalance/{email}")
    public double getAmount(@PathVariable String email) throws BankServiceException {
        try {
            return bankService.getAmountByEmail(email);
        }catch (Exception e){
            throw new BankServiceException("Error in getting amount", e);
        }
    }

}

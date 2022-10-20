package com.walletBankingApp.walletbankingapp.controller;

import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @GetMapping(value = "/getAllTransactions/{email}")
    public List<TransactionEntity> getTransactionsByEmail(@PathVariable String email,
                                                          @RequestParam(value = "pageNumber", defaultValue = "0", required = false) Integer pageNumber,
                                                          @RequestParam(value = "pageSize", defaultValue = "10", required = false) Integer pageSize) throws BankServiceException {
        try {
            return transactionService.getTransactionsByEmail(email, pageNumber, pageSize);
        }catch (Exception e){
            throw new BankServiceException("Error in getting transactions", e);
        }
    }

    @GetMapping(value = "/getTotalTransactions/{email}")
    public int getTotalTransactionsByEmail(@PathVariable String email) throws BankServiceException {
        try {
            return transactionService.getTotalTransactionsByEmail(email);
        }catch (Exception e){
            throw new BankServiceException("Error in getting transactions", e);
        }
    }

}

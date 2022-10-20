package com.walletBankingApp.walletbankingapp.service;

import com.google.common.hash.Hashing;
import com.walletBankingApp.walletbankingapp.entity.*;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.BankRepository;
import com.walletBankingApp.walletbankingapp.repository.CashbackRepository;
import com.walletBankingApp.walletbankingapp.repository.TransactionRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BankService {

    @Autowired
    private BankRepository bankRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private CashbackRepository cashbackRepository;

//    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss a");
    public String signup(UserEntity userEntity) throws BankServiceException {
        try {
            Optional<UserEntity> user1 = bankRepository.findByEmail(userEntity.getEmail());

            if (user1.isPresent()) {
                return "Email already exists...!!";
            }
            String sha256hex = Hashing.sha256()
                    .hashString(userEntity.getPassword(), StandardCharsets.UTF_8)
                    .toString();
            userEntity.setPassword(sha256hex);
            bankRepository.save(userEntity);
            return "Account created successfully...!!";
        }catch(Exception e){
            throw new BankServiceException("Error in signup", e);
        }
    }

    public String signin(Credentials credentials) throws BankServiceException {
        try {
            Optional<UserEntity> user = bankRepository.findByEmail(credentials.getEmail());

            if (!user.isPresent()) {
                return "Account does not exists with this email...!!";
            } else {
                String sha256hex = Hashing.sha256()
                        .hashString(credentials.getPassword(), StandardCharsets.UTF_8)
                        .toString();
                credentials.setPassword(sha256hex);

                if (credentials.getPassword().equals(user.get().getPassword())) {
                    return "Signed in Successfully...!!";
                } else {
                    return "Incorrect Password...!!";
                }
            }
        }catch(Exception e){
            throw new BankServiceException("Error in signin", e);
        }
    }

    public void createTransactionForRecharge(Wallet wallet, String type, UserEntity user){
        TransactionEntity transactions = new TransactionEntity();
        if(type.equals("Cashback")){
            double cashback =  (int)(0.1 * wallet.getAmount());
            transactions.from_name = "Cashback";
            transactions.amount = user.getAmount();
            transactions.transferAmount = cashback;
        }else if(type.equals("Recharge")){
            transactions.from_name = "Bank";
            transactions.amount = user.getAmount() + wallet.getAmount();
            transactions.transferAmount = wallet.getAmount();
            user.setAmount(user.getAmount() + wallet.getAmount());
            bankRepository.save(user);
        }
        transactions.email = user.getEmail();
        transactions.type = "Credit";
        transactions.to_name = user.getFirstName()+" "+user.getLastName();
        transactions.date = new Date();
//        transactions.timestamp = ZonedDateTime.now().format(formatter);
        transactionRepository.save(transactions);
    }

    public void addCashback(Wallet wallet, UserEntity user){
        CashbackEntity cashback = new CashbackEntity();
        cashback.email = user.getEmail();
        cashback.prev_amount = user.getAmount();
        cashback.cashback_amount = (int)(0.1 * wallet.getAmount());
        cashback.current_amount = user.getAmount() + cashback.cashback_amount;
//        cashback.timestamp = ZonedDateTime.now().format(formatter);
        cashback.date = new Date();
        user.setAmount(user.getAmount() + cashback.cashback_amount);
        bankRepository.save(user);
        cashbackRepository.save(cashback);
    }

    public String walletRecharge(Wallet wallet) throws BankServiceException {
        try {
            Optional<UserEntity> user = bankRepository.findByEmail(wallet.getEmail());

            if(wallet.getAmount() <= 0){
                return "Enter a valid amount";
            }

            createTransactionForRecharge(wallet, "Recharge", user.get());

            addCashback(wallet, user.get());

            createTransactionForRecharge(wallet, "Cashback", user.get());

            return "Amount Credited Successfully...!!";
        }catch (Exception e){
            throw new BankServiceException("Error in recharge", e);
        }
    }

    private void createTransaction(Wallet wallet, UserEntity user, UserEntity  user1) {

        TransactionEntity transactions = new TransactionEntity();
        transactions.amount = user.getAmount() - wallet.getAmount();
        transactions.type = "Debit";
        transactions.transferAmount = wallet.getAmount();
        transactions.email = user.getEmail();
        transactions.from_name = user.getFirstName()+" "+user.getLastName();
        transactions.to_name = user1.getFirstName()+" "+user1.getLastName();
//        transactions.timestamp = ZonedDateTime.now().format(formatter);
        transactions.date = new Date();

        transactionRepository.save(transactions);

        TransactionEntity transactions1 = new TransactionEntity();
        transactions1.amount = user1.getAmount() + wallet.getAmount();
        transactions1.type = "Credit";
        transactions1.transferAmount = wallet.getAmount();
        transactions1.email = user1.getEmail();
        transactions1.from_name = user.getFirstName()+" "+user.getLastName();
        transactions1.to_name = user1.getFirstName()+" "+user1.getLastName();
//        transactions1.timestamp = ZonedDateTime.now().format(formatter);
        transactions1.date = new Date();

        transactionRepository.save(transactions1);
    }

    public String transferAmount(Wallet wallet) throws BankServiceException {
        try {
            Optional<UserEntity> user = bankRepository.findByEmail(wallet.getEmail());
            Optional<UserEntity> user1 = bankRepository.findByEmail(wallet.getCreditToEmail());

            if(!user1.isPresent()){
                return "User does not exist";
            }

            if(wallet.getAmount() <= 0){
                return "Enter a valid amount";
            }

            if (user.get().getAmount() < wallet.getAmount()) {
                return "Insufficient Amount";
            }

            createTransaction(wallet, user.get(), user1.get());

            user.get().setAmount(user.get().getAmount() - wallet.getAmount());
            user1.get().setAmount(user1.get().getAmount() + wallet.getAmount());

            bankRepository.save(user.get());
            bankRepository.save(user1.get());

            return "Amount Transferred Successfully...!!";
        }catch(Exception e){
            throw new BankServiceException("Error in amount transfer", e);
        }
    }

    public List<UserEntity> getUsers() throws BankServiceException {
        try {
            return bankRepository.findAll();
        }catch (Exception e){
            throw new BankServiceException("Error in getting users", e);
        }
    }
    public UserEntity getUserDetails(String email) throws BankServiceException {
        try {
            Optional<UserEntity> user = bankRepository.findByEmail(email);

            if (!user.isPresent()) {
                return null;
            }

            return user.get();
        }catch (Exception e){
            throw new BankServiceException("Error in getting user details", e);
        }
    }

    public double getAmountByEmail(String email) throws BankServiceException {
        try {
            Optional<UserEntity> user = bankRepository.findByEmail(email);
            return user.get().getAmount();
        }catch (Exception e){
            throw new BankServiceException("Error in getting amount", e);
        }
    }
}

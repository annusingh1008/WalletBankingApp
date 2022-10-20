package com.walletBankingApp.walletbankingapp.service;

import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<TransactionEntity> getTransactionsByEmail(String email, Integer pageNumber, Integer pageSize) throws BankServiceException {
        try {

            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Query query = new Query().with(pageable).with(Sort.by(Sort.Direction.DESC, "date"));
            query.addCriteria(Criteria.where("email").is(email));
            List<TransactionEntity> pageTransaction = mongoTemplate.find(query, TransactionEntity.class);

            return pageTransaction;

        }catch(Exception e){
            throw new BankServiceException("Error in getting transactions", e);
        }
    }

    public int getTotalTransactionsByEmail(String email) throws BankServiceException {
        try {
            List<TransactionEntity> transactions = transactionRepository.getTotalTransactionsByEmail(email);
            return transactions.size();
        }catch (Exception e){
            throw new BankServiceException("Error in getting transactions", e);
        }
    }
}

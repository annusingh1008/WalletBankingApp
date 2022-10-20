package com.walletBankingApp.walletbankingapp.service;

import com.walletBankingApp.walletbankingapp.entity.CashbackEntity;
import com.walletBankingApp.walletbankingapp.entity.TransactionEntity;
import com.walletBankingApp.walletbankingapp.error.BankServiceException;
import com.walletBankingApp.walletbankingapp.repository.CashbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import javax.security.auth.callback.CallbackHandler;
import java.util.List;

@Service
public class CashbackService {

    @Autowired
    private CashbackRepository cashbackRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<CashbackEntity> getAllcashbacks(String email, Integer pageNumber, Integer pageSize) throws BankServiceException {
        try {
            Pageable pageable = PageRequest.of(pageNumber, pageSize);

            Query query = new Query().with(pageable).with(Sort.by(Sort.Direction.DESC, "date"));
            query.addCriteria(Criteria.where("email").is(email));
            List<CashbackEntity> pageCashback = mongoTemplate.find(query, CashbackEntity.class);

            return pageCashback;
        }catch(Exception e){
            throw new BankServiceException("Error in getting cashbacks", e);
        }
    }

    public int getTotalCashbacksByEmail(String email) throws BankServiceException {
        try {
            List<CashbackEntity> cashbacks = cashbackRepository.getAllcashbacksByEmail(email);
            return cashbacks.size();
        }catch (Exception e){
            throw new BankServiceException("Error in getting cashbacks", e);
        }
    }
}

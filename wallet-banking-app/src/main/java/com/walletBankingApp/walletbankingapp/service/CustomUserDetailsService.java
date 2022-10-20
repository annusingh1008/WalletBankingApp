//package com.walletBankingApp.walletbankingapp.service;
//
//import com.walletBankingApp.walletbankingapp.entity.UserEntity;
//import com.walletBankingApp.walletbankingapp.repository.BankRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.ArrayList;
//import java.util.Optional;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private BankRepository bankRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        Optional<UserEntity> user = bankRepository.findByEmail(username);
//
//        if(user.isPresent()){
//            return new User(user.get().getEmail(), user.get().getPassword(), new ArrayList<>());
//        }else{
//            throw  new UsernameNotFoundException("User not found");
//        }
//    }
//}

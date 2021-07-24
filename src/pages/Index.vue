<template>
<div class= "container mt-5">
    <div class= "row">
        <div class="col-md-12">
            <div class= "card border-0 rounded shadow">
                <div class="card-body">
                    <h4 class="fw-bold text-center">DATA DOSEN</h4>
                    <hr>
                    <router-link :to="{name: 'post.create'}" class="btn btn-md btn-success">
                        TAMBAH POST</router-link>
                        <table class="table table-striped table-bordered mt-4">
                            <thead class="table-dark">
                                <tr>
                                <th class="text-center" scoppe="col">Id</th>
                                <th class="text-center" scoppe="col">Ktp_Dosen</th>
                                <th class="text-center" scoppe="col">Nama_Dosen</th>
                                <th class="text-center" scoppe="col">Alamat_Dosen</th>
                                <th class="text-center" scoppe="col">Email_Dosen</th>
                                <th class="text-center" scoppe="col">Notlp_Dosen</th>
                                <th class="text-center" scoppe="col">Bidang_Dosen</th>
                                <th class="text-center" scoppe="col">Jadwal_Dosen</th>
                                <th class="text-center" scoppe="col">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>{{post.id}}</td>
                                    <td>{{post.ktp_dosen}}</td>
                                    <td>{{post.nama_dosen}}</td>
                                    <td>{{post.alamat_dosen}}</td>
                                    <td>{{post.email_dosen}}</td> 
                                    <td>{{post.notlp_dosen}}</td>
                                    <td>{{post.bidang_dosen}}</td>
                                    <td>{{post.jadwal_dosen}}</td>
                                    <td class="text-center">
                                        <router-link :to="{name : 'post.edit', params:{id: post.id}}"
                                        class="btn btn-sm btn-primary mr-1">EDIT</router-link>
                                        <button 
                                        @click.prevent="postDelete(post.id)" 
                                        class="btn btn-sm btn-danger mr-1">HAPUS
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
</div>

</template>
<script>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
export default {
   setup(){
       let posts = ref([])
       //state token
            const token = localStorage.getItem('token')

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const user = ref('')
       onMounted(() => {
                axios
                .get('http://localhost:8000/api/D112012119_dosen')
                .then((response) => {
                    const res = response.data;
                    const tmp = {};
                    if (res.success == true) {
                        const data = res.data;
                        data.forEach((item) => 
                            tmp[item.id] = item,
                        );
                    }
                    console.log(tmp)
                    posts.value = tmp;

                })
                .catch(error =>{
                    console.log(error.response.data)
                });





                  //check Token exist
                if(!token) {
                    return router.push({
                        name: 'login'
                    })
                }
                
                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.get('http://localhost:8000/api/user')
                .then(response => {

                    //console.log(response.data.name)
                    user.value = response.data

                })
                .catch(error => {
                    console.log(error.response.data)
                })









       });


       function postDelete(id){
           //delete data post by ID
           axios
            .delete(`http://localhost:8000/api/D112012119_dosen/${id}`)
            .then((response) => {
                alert(id);
                if (response.data.success == true) {
                    delete posts.value[id];

                }
            })
            .catch((error) => {
                console.log(error.response.data);

            });
       }    
        return {
           posts,
           postDelete,
           token,      // <-- state token
           user,       // <-- state user
       };
}
}
</script>

<style>
body{
    background: rgb(19, 80, 6);
}
</style>